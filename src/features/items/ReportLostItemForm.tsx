import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  Checkbox,
  FormControlLabel,
  FormGroup,
  CircularProgress,
  Alert,
} from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import { LocalizationProvider, MobileDatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import dayjs from "dayjs";
import "dayjs/locale/es";
import { LOCATIONS } from "../../constants/locations";
import { ITEM_TYPES } from "../../constants/itemTypes";
import { useState } from "react";
import { SelectChangeEvent } from "@mui/material/Select";
import { ImageUpload } from "../../components/ImageUpload/ImageUpload";
import { useNavigate } from "react-router-dom";
import type { Location } from "../../types";
import { ItemTypeData } from "../../types/itemType";
import { LostItem } from "../../types/models";
import { LostItemStatus } from "../../types/enums";
import { useItemsStore } from "../../stores/itemsStore";
import { useUserStore } from "../../stores/userStore";

// Configuramos el locale español
dayjs.locale("es");

interface ReportLostItemFormValues {
  type: string;
  locations: Location[];
  lostDate: Date;
  description: string;
  image?: File | null;
}

const validationSchema = yup.object({
  type: yup.string().required("Por favor selecciona un tipo de objeto"),
  locations: yup
    .array()
    .of(yup.string())
    .min(1, "Por favor selecciona al menos una ubicación")
    .max(2, "No puedes seleccionar más de 2 ubicaciones")
    .required("Por favor selecciona al menos una ubicación"),
  lostDate: yup.date().required("Por favor selecciona la fecha"),
  description: yup
    .string()
    .required("Por favor describe el objeto")
    .min(10, "La descripción debe tener al menos 10 caracteres")
    .max(500, "La descripción no puede exceder los 500 caracteres"),
  image: yup.mixed().nullable(),
});

export function ReportLostItemForm() {
  const [open, setOpen] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [confirmations, setConfirmations] = useState({
    truthful: false,
    ownership: false,
    consequences: false,
  });
  const navigate = useNavigate();
  const { addLostItem } = useItemsStore();
  const currentUser = useUserStore((state) => state.currentUser);

  const allConfirmed = Object.values(confirmations).every(Boolean);

  const handleConfirmationChange = (key: keyof typeof confirmations) => {
    setConfirmations((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const formik = useFormik<ReportLostItemFormValues>({
    initialValues: {
      type: "",
      locations: [],
      lostDate: new Date(),
      description: "",
      image: null,
    },
    validationSchema,
    onSubmit: async (values) => {
      setShowConfirmDialog(true);
    },
  });

  const handleConfirm = async () => {
    setShowConfirmDialog(false);
    setIsSubmitting(true);
    setError(null);

    try {
      if (!currentUser) {
        navigate("/login");
        return;
      }

      // Find the matching ItemType object
      const selectedType = ITEM_TYPES.find(
        (type) => type.value === formik.values.type
      );
      if (!selectedType) {
        throw new Error("Tipo de objeto inválido");
      }

      // Convert image File to data URL if it exists
      let imageUrl: string | undefined = undefined;
      if (formik.values.image) {
        const reader = new FileReader();
        imageUrl = await new Promise<string>((resolve, reject) => {
          reader.onload = () => {
            const result = reader.result;
            if (typeof result === "string") {
              resolve(result);
            } else {
              reject(new Error("Error al procesar la imagen"));
            }
          };
          reader.onerror = () => reject(reader.error);
          reader.readAsDataURL(formik.values.image as File);
        });
      }

      // Create the lost item
      const newItem = new LostItem({
        type: selectedType,
        locations: formik.values.locations,
        lostDate: formik.values.lostDate,
        description: formik.values.description,
        imageUrl,
        seekerId: currentUser.id,
        status: LostItemStatus.SEARCHING,
        id: "", // This will be set by Firestore
      });

      // Add to Firestore
      const itemId = await addLostItem(newItem);

      // Navigate to search results
      navigate("/search-results", {
        state: {
          matches: [],
          lostItem: new LostItem({
            ...newItem,
            id: itemId,
          }),
        },
      });
    } catch (err) {
      console.error("Error al reportar objeto perdido:", err);
      setError(
        err instanceof Error ? err.message : "Error al reportar objeto perdido"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Box
        component="form"
        onSubmit={formik.handleSubmit}
        sx={{ width: "100%" }}
      >
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          <FormControl
            fullWidth
            error={formik.touched.type && Boolean(formik.errors.type)}
          >
            <InputLabel>Tipo de Objeto</InputLabel>
            <Select
              name="type"
              value={formik.values.type}
              onChange={formik.handleChange}
              label="Tipo de Objeto"
              disabled={isSubmitting}
            >
              {ITEM_TYPES.map((type: ItemTypeData) => (
                <MenuItem key={type.value} value={type.value}>
                  {type.label}
                </MenuItem>
              ))}
            </Select>
            {formik.touched.type && formik.errors.type && (
              <FormHelperText>{formik.errors.type}</FormHelperText>
            )}
          </FormControl>

          <FormControl
            fullWidth
            error={formik.touched.locations && Boolean(formik.errors.locations)}
          >
            <InputLabel>Posibles Ubicaciones (máx. 2)</InputLabel>
            <Select
              multiple
              open={open}
              onOpen={() => setOpen(true)}
              onClose={() => setOpen(false)}
              name="locations"
              value={formik.values.locations}
              onChange={(event: SelectChangeEvent<Location[]>) => {
                const newValue = event.target.value as Location[];
                formik.setFieldValue("locations", newValue);
                if (newValue.length >= 2) {
                  setOpen(false);
                }
              }}
              label="Posibles Ubicaciones (máx. 2)"
              disabled={isSubmitting}
            >
              {LOCATIONS.map((location: Location) => (
                <MenuItem
                  key={location}
                  value={location}
                  disabled={
                    formik.values.locations.length >= 2 &&
                    !formik.values.locations.includes(location)
                  }
                >
                  {location}
                </MenuItem>
              ))}
            </Select>
            {formik.touched.locations && formik.errors.locations && (
              <FormHelperText>
                {formik.errors.locations as string}
              </FormHelperText>
            )}
          </FormControl>

          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
            <MobileDatePicker
              label="¿Cuándo lo perdiste?"
              value={dayjs(formik.values.lostDate)}
              onChange={(newValue) => {
                if (newValue) {
                  formik.setFieldValue("lostDate", newValue.toDate());
                }
              }}
              maxDate={dayjs().endOf("day")}
              disabled={isSubmitting}
              slotProps={{
                textField: {
                  fullWidth: true,
                  error:
                    formik.touched.lostDate && Boolean(formik.errors.lostDate),
                  helperText:
                    formik.touched.lostDate &&
                    (formik.errors.lostDate as string),
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

          <TextField
            fullWidth
            multiline
            rows={4}
            name="description"
            label="Descripción"
            value={formik.values.description}
            onChange={formik.handleChange}
            error={
              formik.touched.description && Boolean(formik.errors.description)
            }
            helperText={formik.touched.description && formik.errors.description}
            disabled={isSubmitting}
          />

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
            previewUrl={previewUrl}
            disabled={isSubmitting}
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={isSubmitting || !formik.isValid}
            sx={{ mt: 2 }}
          >
            {isSubmitting ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Reportar Objeto Perdido"
            )}
          </Button>
        </Box>
      </Box>

      <Dialog
        open={showConfirmDialog}
        onClose={() => setShowConfirmDialog(false)}
      >
        <DialogTitle>Confirmación</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Por favor, confirma las siguientes declaraciones antes de continuar:
          </DialogContentText>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={confirmations.truthful}
                  onChange={() => handleConfirmationChange("truthful")}
                />
              }
              label="Declaro que toda la información proporcionada es verdadera"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={confirmations.ownership}
                  onChange={() => handleConfirmationChange("ownership")}
                />
              }
              label="Confirmo que soy el dueño legítimo del objeto o estoy autorizado para reportarlo"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={confirmations.consequences}
                  onChange={() => handleConfirmationChange("consequences")}
                />
              }
              label="Entiendo que proporcionar información falsa puede tener consecuencias"
            />
          </FormGroup>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowConfirmDialog(false)}>Cancelar</Button>
          <Button
            onClick={handleConfirm}
            disabled={!allConfirmed || isSubmitting}
            color="primary"
          >
            {isSubmitting ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Confirmar"
            )}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
