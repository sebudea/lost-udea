import {
  Alert,
  Box,
  Container,
  Paper,
  Snackbar,
  Tab,
  Tabs,
  ThemeProvider,
  Typography,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import CategoryIcon from "@mui/icons-material/Category";

import { theme } from "./styles/theme";
import { useState } from "react";
import { TabPanel } from "./components/TabPanel/TabPanel";
import { FoundItemForm } from "./features/items/FoundItemForm";
import { LostItemForm } from "./features/items/LostItemForm";

function App() {
  const [tabValue, setTabValue] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

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
