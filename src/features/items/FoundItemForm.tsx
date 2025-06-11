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
import type { ItemType, Location } from "../../types/enums";

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
  const { addFoundItem } = useItemsStore();

  const formik = useFormik<FormValues>({
    initialValues: {
      itemType: "",
      location: "",
      date: new Date(),
      image: null,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        // Convertir la imagen a base64 si existe
        let imageData = "";
        if (values.image) {
          const reader = new FileReader();
          imageData = await new Promise<string>((resolve, reject) => {
            reader.onload = () => {
              const result = reader.result;
              if (typeof result === "string") {
                resolve(result);
              } else {
                reject(new Error("Failed to convert image to string"));
              }
            };
            reader.onerror = () => reject(reader.error);
            reader.readAsDataURL(values.image as File);
          });
        }

        // Encontrar el tipo de objeto completo
        const selectedType = ITEM_TYPES.find(
          (type) => type.value === values.itemType
        );
        if (!selectedType) {
          throw new Error("Invalid item type");
        }

        // Crear el objeto encontrado
        const foundItem = {
          type: selectedType,
          location: values.location as Location,
          foundDate: values.date,
          image: imageData,
          finderId: "mock-finder-id", // ID simulado por ahora
        };

        // Agregar al store
        addFoundItem(foundItem);

        // Resetear el formulario
        formik.resetForm();
        setPreviewUrl(null);
        onSuccess(values.location);
      } catch (error) {
        console.error("Error al procesar el objeto encontrado:", error);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
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
        >
          {ITEM_TYPES.map((item) => (
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
        onImageChange={(file) => formik.setFieldValue("image", file)}
        onPreviewChange={setPreviewUrl}
        error={
          formik.touched.image ? (formik.errors.image as string) : undefined
        }
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
          endIcon={<SendIcon />}
          disabled={formik.isSubmitting}
        >
          Reportar objeto encontrado
        </Button>
      </Box>
    </form>
  );
}
