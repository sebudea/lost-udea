import {
  Container,
  Typography,
  Paper,
  Box,
  Tabs,
  Tab,
  IconButton,
} from "@mui/material";
import { AuthLayout } from "../components/Layout/AuthLayout";
import { useState } from "react";
import { TabPanel } from "../components/TabPanel/TabPanel";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";

interface ProfilePageProps {
  isDarkMode: boolean;
  onToggleTheme: () => void;
}

export function ProfilePage({ isDarkMode, onToggleTheme }: ProfilePageProps) {
  const [tabValue, setTabValue] = useState(0);
  const navigate = useNavigate();

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <AuthLayout isDarkMode={isDarkMode} onToggleTheme={onToggleTheme}>
      <IconButton
        onClick={() => navigate("/home")}
        color="inherit"
        sx={{
          position: "fixed",
          left: "50%",
          bottom: 16,
          transform: "translateX(-50%)",
          bgcolor: "background.paper",
          boxShadow: 1,
          "&:hover": {
            bgcolor: "background.paper",
          },
        }}
      >
        <HomeIcon />
      </IconButton>
      <Container
        maxWidth="md"
        sx={{
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 4,
            width: "100%",
          }}
        >
          <Paper elevation={2} sx={{ p: 4, borderRadius: 3 }}>
            <Typography variant="h5" component="h1" gutterBottom>
              Información del Perfil
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Typography>
                <strong>Nombre:</strong> Juan Pérez
              </Typography>
              <Typography>
                <strong>Teléfono:</strong> 3001234567
              </Typography>
              <Typography>
                <strong>Identificación:</strong> 1234567890
              </Typography>
            </Box>
          </Paper>

          <Paper elevation={2} sx={{ borderRadius: 3, overflow: "hidden" }}>
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              variant="fullWidth"
              sx={{ borderBottom: 1, borderColor: "divider" }}
            >
              <Tab label="Objetos Perdidos" />
              <Tab label="Objetos Encontrados" />
            </Tabs>

            <TabPanel value={tabValue} index={0}>
              <Box sx={{ p: 3 }}>
                <Typography color="text.secondary">
                  No has reportado ningún objeto perdido aún.
                </Typography>
              </Box>
            </TabPanel>

            <TabPanel value={tabValue} index={1}>
              <Box sx={{ p: 3 }}>
                <Typography color="text.secondary">
                  No has reportado ningún objeto encontrado aún.
                </Typography>
              </Box>
            </TabPanel>
          </Paper>
        </Box>
      </Container>
    </AuthLayout>
  );
}
