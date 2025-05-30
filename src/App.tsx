import {
  Alert,
  Box,
  Button,
  Container,
  FormControl,
  FormHelperText,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Snackbar,
  Tab,
  Tabs,
  ThemeProvider,
  Typography,
} from "@mui/material";

import GoogleIcon from "@mui/icons-material/Google";
import SendIcon from "@mui/icons-material/Send";
import SearchIcon from "@mui/icons-material/Search";
import CategoryIcon from "@mui/icons-material/Category";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import CloudUpload from "@mui/icons-material/CloudUpload";

import { LocalizationProvider, MobileDatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { theme } from "./styles/theme";
import { useState, useRef } from "react";
import { useFormik } from "formik";
import * as yup from "yup";

// Set default locale to Spanish
dayjs.locale("es-ES");

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 4 }}>{children}</Box>}
    </div>
  );
}

// Validation schema
const validationSchema = yup.object({
  itemType: yup.string().required("Por favor selecciona qué encontraste"),
  location: yup.string().required("Por favor selecciona dónde lo encontraste"),
  date: yup
    .date()
    .required("Por favor selecciona cuándo lo encontraste")
    .max(new Date(), "La fecha no puede ser futura"),
  image: yup.mixed().required("Por favor sube o toma una foto del objeto"),
});

// Form values type
interface FormValues {
  itemType: string;
  location: string;
  date: dayjs.Dayjs;
  image: File | null;
}

function App() {
  const [tabValue, setTabValue] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      formik.setFieldValue("image", file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCameraCapture = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      // Aquí iría la lógica para mostrar un modal con la cámara y capturar la foto
      // Por ahora, simplemente abrimos el selector de archivos
      fileInputRef.current?.click();
    } catch (error) {
      console.error("Error accessing camera:", error);
      fileInputRef.current?.click();
    }
  };

  const formik = useFormik<FormValues>({
    initialValues: {
      itemType: "",
      location: "",
      date: dayjs(),
      image: null,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
      setShowSuccess(true);
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ bgcolor: "background.default", minHeight: "100vh" }}>
        <Container maxWidth="md">
          <Box
            sx={{
              py: 4,
              display: "flex",
              flexDirection: "column",
              gap: 4,
            }}
          >
            {/* Header */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 2,
              }}
            >
              <Typography
                variant="h2"
                align="center"
                color="primary"
                sx={{ fontWeight: 700 }}
              >
                Lost UdeA
              </Typography>
              <Typography
                variant="subtitle1"
                align="center"
                color="text.secondary"
                sx={{ maxWidth: 600 }}
              >
                Sistema de objetos perdidos y encontrados de la Universidad de
                Antioquia
              </Typography>
            </Box>

            {/* Main Content */}
            <Paper elevation={2} sx={{ borderRadius: 3, overflow: "hidden" }}>
              <Tabs
                value={tabValue}
                onChange={handleTabChange}
                variant="fullWidth"
                sx={{ borderBottom: 1, borderColor: "divider" }}
              >
                <Tab
                  icon={<CategoryIcon />}
                  label="Encontré un objeto"
                  sx={{
                    textTransform: "none",
                    fontSize: "1.1rem",
                    py: 2,
                  }}
                />
                <Tab
                  icon={<SearchIcon />}
                  label="Perdí un objeto"
                  sx={{
                    textTransform: "none",
                    fontSize: "1.1rem",
                    py: 2,
                  }}
                />
              </Tabs>

              {/* Found Item Panel */}
              <TabPanel value={tabValue} index={0}>
                <form onSubmit={formik.handleSubmit}>
                  <FormControl
                    fullWidth
                    error={
                      formik.touched.itemType && Boolean(formik.errors.itemType)
                    }
                    margin="normal"
                  >
                    <InputLabel id="que-select-label">
                      ¿Qué encontraste?
                    </InputLabel>
                    <Select
                      labelId="que-select-label"
                      id="itemType"
                      name="itemType"
                      value={formik.values.itemType}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      label="¿Qué encontraste?"
                    >
                      <MenuItem value="ropa">Ropa o Accesorios</MenuItem>
                      <MenuItem value="celular">
                        Celular o Dispositivo Electrónico
                      </MenuItem>
                      <MenuItem value="documento">Documento o Carné</MenuItem>
                      <MenuItem value="mochila">Mochila o Bolso</MenuItem>
                      <MenuItem value="libro">
                        Libro o Material Académico
                      </MenuItem>
                      <MenuItem value="otro">Otro</MenuItem>
                    </Select>
                    {formik.touched.itemType && formik.errors.itemType && (
                      <FormHelperText>{formik.errors.itemType}</FormHelperText>
                    )}
                  </FormControl>

                  <FormControl
                    fullWidth
                    error={
                      formik.touched.location && Boolean(formik.errors.location)
                    }
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
                      <MenuItem value="bloque18">
                        Bloque 18 - Ingeniería
                      </MenuItem>
                      <MenuItem value="bloque19">
                        Bloque 19 - Ingeniería
                      </MenuItem>
                      <MenuItem value="bloque21">
                        Bloque 21 - Ingeniería
                      </MenuItem>
                      <MenuItem value="biblioteca">Biblioteca Central</MenuItem>
                      <MenuItem value="cafeteria">Cafetería Central</MenuItem>
                      <MenuItem value="coliseo">Coliseo</MenuItem>
                      <MenuItem value="otro">Otro lugar</MenuItem>
                    </Select>
                    {formik.touched.location && formik.errors.location && (
                      <FormHelperText>{formik.errors.location}</FormHelperText>
                    )}
                  </FormControl>

                  <Box sx={{ my: 2 }}>
                    <LocalizationProvider
                      dateAdapter={AdapterDayjs}
                      adapterLocale="es"
                    >
                      <MobileDatePicker
                        label="¿Cuándo lo encontraste?"
                        value={formik.values.date}
                        onChange={(value) =>
                          formik.setFieldValue("date", value)
                        }
                        slotProps={{
                          textField: {
                            fullWidth: true,
                            error:
                              formik.touched.date &&
                              Boolean(formik.errors.date),
                            helperText:
                              formik.touched.date &&
                              (formik.errors.date as string),
                          },
                        }}
                      />
                    </LocalizationProvider>
                  </Box>

                  {/* Image upload/capture section */}
                  <Box sx={{ mt: 3, textAlign: "center" }}>
                    <input
                      type="file"
                      accept="image/*"
                      style={{ display: "none" }}
                      ref={fileInputRef}
                      onChange={handleImageChange}
                    />

                    <Box
                      sx={{
                        display: "flex",
                        gap: 2,
                        justifyContent: "center",
                        mb: 2,
                      }}
                    >
                      <Button
                        variant="outlined"
                        startIcon={<CloudUpload />}
                        onClick={() => fileInputRef.current?.click()}
                      >
                        Subir Foto
                      </Button>
                      <Button
                        variant="outlined"
                        startIcon={<PhotoCamera />}
                        onClick={handleCameraCapture}
                      >
                        Tomar Foto
                      </Button>
                    </Box>

                    {previewUrl && (
                      <Box sx={{ mt: 2, mb: 3 }}>
                        <img
                          src={previewUrl}
                          alt="Vista previa"
                          style={{
                            maxWidth: "100%",
                            maxHeight: "200px",
                            borderRadius: "8px",
                            boxShadow: theme.shadows[1],
                          }}
                        />
                      </Box>
                    )}

                    {formik.touched.image && formik.errors.image && (
                      <Typography
                        color="error"
                        variant="caption"
                        display="block"
                        sx={{ mt: 1 }}
                      >
                        {formik.errors.image as string}
                      </Typography>
                    )}
                  </Box>

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
              </TabPanel>

              {/* Lost Item Panel */}
              <TabPanel value={tabValue} index={1}>
                <Box sx={{ textAlign: "center", py: 3 }}>
                  <Typography
                    variant="body1"
                    paragraph
                    color="text.secondary"
                    sx={{ mb: 4 }}
                  >
                    Inicia sesión para ver los objetos reportados y encontrar el
                    tuyo. Te notificaremos cuando aparezca algo similar.
                  </Typography>

                  <Button
                    variant="contained"
                    color="secondary"
                    startIcon={<GoogleIcon />}
                    size="large"
                  >
                    Iniciar sesión con Google
                  </Button>
                </Box>
              </TabPanel>
            </Paper>
          </Box>
        </Container>

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
      </Box>
    </ThemeProvider>
  );
}

export default App;
