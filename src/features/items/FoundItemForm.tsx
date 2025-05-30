import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Box,
  Button,
  InputAdornment,
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
import type { FormValues } from "./types";
import { Snackbar, Alert } from "@mui/material";

// Configuramos el locale español
dayjs.locale("es");

export function FoundItemForm() {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const formik = useFormik<FormValues>({
    initialValues: {
      itemType: "",
      location: "",
      date: new Date(),
      image: null,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
      setShowSuccess(true);
      formik.resetForm();
      setPreviewUrl(null);
    },
  });

  return (
    <>
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
          <InputLabel id="donde-select-label">
            ¿Dónde lo encontraste?
          </InputLabel>
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

      <Snackbar
        open={showSuccess}
        autoHideDuration={6000}
        onClose={() => setShowSuccess(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setShowSuccess(false)}
          severity="success"
          variant="filled"
        >
          ¡Gracias por reportar el objeto! Tu reporte ha sido registrado
          exitosamente.
        </Alert>
      </Snackbar>
    </>
  );
}
