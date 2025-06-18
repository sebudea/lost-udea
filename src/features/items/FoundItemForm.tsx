import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Box,
  Button,
  InputAdornment,
  TextField,
  CircularProgress,
  Alert,
} from "@mui/material";
import { LocalizationProvider, MobileDatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import SendIcon from "@mui/icons-material/Send";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { useFormik } from "formik";
import dayjs from "dayjs";
import "dayjs/locale/es"; // Importamos el locale español
import { useState } from "react";
import { ImageUpload } from "../../components/ImageUpload/ImageUpload";
import { ITEM_TYPES } from "../../constants/itemTypes";
import { LOCATIONS } from "../../constants/locations";
import { validationSchema } from "../../utils/validation";
import { useItemsStore } from "../../stores/itemsStore";
import { Location, FoundItemStatus } from "../../types/enums";
import { ItemTypeData } from "../../types/itemType";
import { FoundItem, User } from "../../types/models";
import { useAuthContext } from "../../context/AuthContext";
import { db } from "../../config/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

// Configuramos el locale español
dayjs.locale("es");

interface FormValues {
  itemType: string;
  location: string;
  date: Date;
  image: File | null;
}

interface FoundItemFormProps {
  onSuccess: (location: string) => void;
}

export function FoundItemForm({ onSuccess }: FoundItemFormProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { addFoundItem } = useItemsStore();
  const { signInWithGoogle } = useAuthContext();

  const createBasicUser = async (
    userId: string,
    email: string,
    fullName: string
  ) => {
    try {
      const userRef = doc(db, "users", userId);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        // Solo crear si no existe
        const newUser = new User({
          id: userId,
          email,
          fullName,
          createdAt: new Date(),
        });
        await setDoc(userRef, newUser.toFirestore());
      }
      return userId;
    } catch (error) {
      console.error("Error creating basic user:", error);
      throw new Error("Error al crear usuario");
    }
  };

  const formik = useFormik<FormValues>({
    initialValues: {
      itemType: "",
      location: "",
      date: new Date(),
      image: null,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setIsSubmitting(true);
      setError(null);

      try {
        // 1. Autenticar con Google y crear usuario básico
        const authUser = await signInWithGoogle();
        if (!authUser) {
          throw new Error("Error en la autenticación");
        }

        // 2. Crear usuario básico si no existe
        const userId = await createBasicUser(
          authUser.uid,
          authUser.email || "",
          authUser.displayName || ""
        );

        // 3. Convertir la imagen a base64
        if (!values.image) {
          throw new Error("La imagen es requerida");
        }

        const imageData = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => {
            const result = reader.result;
            if (typeof result === "string") {
              resolve(result);
            } else {
              reject(new Error("Error al procesar la imagen"));
            }
          };
          reader.onerror = () => reject(reader.error);
          reader.readAsDataURL(values.image as File);
        });

        // 4. Encontrar el tipo de objeto
        const selectedType = ITEM_TYPES.find(
          (type) => type.value === values.itemType
        );
        if (!selectedType) {
          throw new Error("Tipo de objeto inválido");
        }

        // 5. Crear el FoundItem
        const foundItem = new FoundItem({
          type: selectedType,
          location: values.location as Location,
          foundDate: values.date,
          image: imageData,
          finderId: userId,
          status: FoundItemStatus.PENDING,
        });

        // 6. Guardar en Firestore
        await addFoundItem(foundItem);

        // 7. Limpiar formulario y notificar éxito
        formik.resetForm();
        setPreviewUrl(null);
        onSuccess(values.location);
      } catch (err) {
        console.error("Error al procesar el objeto encontrado:", err);
        setError(
          err instanceof Error ? err.message : "Error al reportar el objeto"
        );
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <FormControl
        fullWidth
        error={formik.touched.itemType && Boolean(formik.errors.itemType)}
        margin="normal"
      >
        <InputLabel id="que-select-label">¿Qué encontraste?</InputLabel>
        <Select
          labelId="que-select-label"
          id="itemType"
          name="itemType"
          value={formik.values.itemType}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          label="¿Qué encontraste?"
          disabled={isSubmitting}
        >
          {ITEM_TYPES.map((item: ItemTypeData) => (
            <MenuItem key={item.value} value={item.value}>
              {item.label}
            </MenuItem>
          ))}
        </Select>
        {formik.touched.itemType && formik.errors.itemType && (
          <FormHelperText>{formik.errors.itemType}</FormHelperText>
        )}
      </FormControl>

      <FormControl
        fullWidth
        error={formik.touched.location && Boolean(formik.errors.location)}
        margin="normal"
      >
        <InputLabel id="donde-select-label">¿Dónde lo encontraste?</InputLabel>
        <Select
          labelId="donde-select-label"
          id="location"
          name="location"
          value={formik.values.location}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          label="¿Dónde lo encontraste?"
          disabled={isSubmitting}
        >
          {LOCATIONS.map((location) => (
            <MenuItem key={location} value={location}>
              {location}
            </MenuItem>
          ))}
        </Select>
        {formik.touched.location && formik.errors.location && (
          <FormHelperText>{formik.errors.location}</FormHelperText>
        )}
      </FormControl>

      <Box sx={{ my: 2 }}>
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
          <MobileDatePicker
            label="¿Cuándo lo encontraste?"
            value={dayjs(formik.values.date)}
            onChange={(newValue) => {
              if (newValue) {
                formik.setFieldValue("date", newValue.toDate());
              }
            }}
            maxDate={dayjs().endOf("day")}
            disabled={isSubmitting}
            slotProps={{
              textField: {
                fullWidth: true,
                error: formik.touched.date && Boolean(formik.errors.date),
                helperText:
                  formik.touched.date && (formik.errors.date as string),
                InputProps: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <CalendarTodayIcon />
                    </InputAdornment>
                  ),
                },
              },
            }}
          />
        </LocalizationProvider>
      </Box>

      <ImageUpload
        onImageChange={(file) => {
          formik.setFieldValue("image", file);
          if (file) {
            const reader = new FileReader();
            reader.onload = () => {
              setPreviewUrl(reader.result as string);
            };
            reader.readAsDataURL(file);
          } else {
            setPreviewUrl(null);
          }
        }}
        onPreviewChange={setPreviewUrl}
        error={
          formik.touched.image ? (formik.errors.image as string) : undefined
        }
        disabled={isSubmitting}
      />

      {previewUrl && (
        <Box sx={{ mt: 2, mb: 3, textAlign: "center" }}>
          <img
            src={previewUrl}
            alt="Vista previa"
            style={{
              maxWidth: "100%",
              maxHeight: "200px",
              borderRadius: "8px",
              margin: "0 auto",
            }}
          />
        </Box>
      )}

      <Box sx={{ mt: 3, textAlign: "center" }}>
        <Button
          type="submit"
          variant="contained"
          size="large"
          endIcon={isSubmitting ? <CircularProgress size={24} /> : <SendIcon />}
          disabled={isSubmitting || !formik.isValid}
        >
          {isSubmitting ? "Enviando..." : "Reportar objeto encontrado"}
        </Button>
      </Box>
    </form>
  );
}
