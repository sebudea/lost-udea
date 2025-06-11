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
import type { Location, ItemType, FoundItem, LostItem } from "../../types";
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
      // Mostrar diálogo de confirmación en lugar de enviar directamente
      setShowConfirmDialog(true);
    },
  });

  const handleConfirm = async () => {
    setShowConfirmDialog(false);

    if (!currentUser) {
      navigate("/login");
      return;
    }

    // Find the matching ItemType object
    const selectedType = ITEM_TYPES.find(
      (type) => type.value === formik.values.type
    );
    if (!selectedType) {
      console.error("Invalid item type");
      return;
    }

    // Create the lost item with proper type
    const newItem = {
      ...formik.values,
      type: selectedType,
      seekerId: currentUser.id,
    };

    // Add to store
    addLostItem(newItem);

    // Navigate to search results
    navigate("/search-results", {
      state: {
        matches: [],
        lostItem: {
          ...newItem,
          id: Date.now().toString(),
          status: "searching" as const,
        },
      },
    });
  };

  return (
    <>
      <Box
        component="form"
        onSubmit={formik.handleSubmit}
        sx={{ width: "100%" }}
      >
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
            >
              {ITEM_TYPES.map((type: ItemType) => (
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
              <FormHelperText>{formik.errors.locations}</FormHelperText>
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
            label="Descripción del objeto"
            placeholder="Describe el objeto con el mayor detalle posible (color, marca, características distintivas, etc.)"
            value={formik.values.description}
            onChange={formik.handleChange}
            error={
              formik.touched.description && Boolean(formik.errors.description)
            }
            helperText={formik.touched.description && formik.errors.description}
          />

          <ImageUpload
            onImageChange={(file) => formik.setFieldValue("image", file)}
            onPreviewChange={setPreviewUrl}
            error={
              formik.touched.image ? (formik.errors.image as string) : undefined
            }
            optional
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

          <Button
            type="submit"
            variant="contained"
            size="large"
            fullWidth
            sx={{ mt: 2 }}
          >
            Enviar Reporte
          </Button>
        </Box>
      </Box>

      <Dialog
        open={showConfirmDialog}
        onClose={() => setShowConfirmDialog(false)}
        aria-labelledby="confirm-dialog-title"
      >
        <DialogTitle id="confirm-dialog-title">
          Confirmación de Reporte
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Antes de enviar tu reporte, necesitamos que confirmes algunos puntos
            importantes:
          </DialogContentText>
          <FormGroup sx={{ mt: 2 }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={confirmations.truthful}
                  onChange={() => handleConfirmationChange("truthful")}
                />
              }
              label="Confirmo que la información proporcionada es verdadera y precisa"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={confirmations.ownership}
                  onChange={() => handleConfirmationChange("ownership")}
                />
              }
              label="Confirmo que soy el legítimo dueño o representante autorizado del objeto perdido"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={confirmations.consequences}
                  onChange={() => handleConfirmationChange("consequences")}
                />
              }
              label="Entiendo que hacer un reporte falso puede tener consecuencias legales y disciplinarias según el reglamento universitario"
            />
          </FormGroup>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setShowConfirmDialog(false);
              setConfirmations({
                truthful: false,
                ownership: false,
                consequences: false,
              });
            }}
          >
            Cancelar
          </Button>
          <Button
            onClick={handleConfirm}
            variant="contained"
            disabled={!allConfirmed}
            autoFocus
          >
            Confirmar y Enviar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
