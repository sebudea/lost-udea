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
} from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import { LocalizationProvider, MobileDatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import dayjs from "dayjs";
import "dayjs/locale/es";
import { LOCATIONS, Location } from "../../constants/locations";
import { ITEM_TYPES, ItemType } from "../../constants/itemTypes";

// Configuramos el locale español
dayjs.locale("es");

interface ReportLostItemFormValues {
  type: string;
  locations: Location[];
  lostDate: Date;
  description: string;
  imageUrl?: string;
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
});

export function ReportLostItemForm() {
  const formik = useFormik<ReportLostItemFormValues>({
    initialValues: {
      type: "",
      locations: [],
      lostDate: new Date(),
      description: "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
      // Aquí irá la lógica para guardar el objeto perdido
    },
  });

  return (
    <Box component="form" onSubmit={formik.handleSubmit} sx={{ width: "100%" }}>
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
            name="locations"
            value={formik.values.locations}
            onChange={formik.handleChange}
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
                  formik.touched.lostDate && (formik.errors.lostDate as string),
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
  );
}
