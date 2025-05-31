import {
  Alert,
  Box,
  Container,
  IconButton,
  Paper,
  Snackbar,
  Tab,
  Tabs,
  ThemeProvider,
  Typography,
  useMediaQuery,
  CssBaseline,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import CategoryIcon from "@mui/icons-material/Category";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

import { getTheme } from "./styles/theme";
import { useState, useMemo } from "react";
import { TabPanel } from "./components/TabPanel/TabPanel";
import { FoundItemForm } from "./features/items/FoundItemForm";
import { LostItemForm } from "./features/items/LostItemForm";

function App() {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [mode, setMode] = useState<"light" | "dark">(
    prefersDarkMode ? "dark" : "light"
  );
  const [tabValue, setTabValue] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);

  const theme = useMemo(() => getTheme(mode), [mode]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const toggleColorMode = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <IconButton
        onClick={toggleColorMode}
        color="inherit"
        sx={{
          position: "fixed",
          right: 16,
          top: 16,
          bgcolor: "background.paper",
          boxShadow: 1,
          "&:hover": {
            bgcolor: "background.paper",
          },
        }}
      >
        {mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>
      <Box sx={{ bgcolor: "background.default", minHeight: "100vh" }}>
        <Container maxWidth="sm" sx={{ pt: 4, pb: 6 }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 4,
            }}
          >
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

              <TabPanel value={tabValue} index={0}>
                <FoundItemForm />
              </TabPanel>

              <TabPanel value={tabValue} index={1}>
                <LostItemForm />
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
