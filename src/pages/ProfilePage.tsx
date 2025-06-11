import {
  Container,
  Typography,
  Paper,
  Box,
  Tabs,
  Tab,
  IconButton,
  Button,
} from "@mui/material";
import { AuthLayout } from "../components/Layout/AuthLayout";
import { useState } from "react";
import { TabPanel } from "../components/TabPanel/TabPanel";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../stores/userStore";
import { useItemsStore } from "../stores/itemsStore";

interface ProfilePageProps {
  isDarkMode: boolean;
  onToggleTheme: () => void;
}

export function ProfilePage({ isDarkMode, onToggleTheme }: ProfilePageProps) {
  const [tabValue, setTabValue] = useState(0);
  const navigate = useNavigate();
  const currentUser = useUserStore((state) => state.currentUser);
  const logout = useUserStore((state) => state.logout);
  const { getLostItemsByUser, getFoundItemsByUser } = useItemsStore();

  const lostItems = currentUser ? getLostItemsByUser(currentUser.id) : [];
  const foundItems = currentUser ? getFoundItemsByUser(currentUser.id) : [];

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  if (!currentUser) {
    navigate("/");
    return null;
  }

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
          minHeight: "calc(100vh - 64px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          py: 4,
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
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 3,
              }}
            >
              <Typography variant="h5" component="h1">
                Información del Perfil
              </Typography>
              <Button variant="outlined" color="error" onClick={handleLogout}>
                Cerrar Sesión
              </Button>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Typography>
                <strong>Nombre:</strong> {currentUser.fullName}
              </Typography>
              <Typography>
                <strong>Email:</strong> {currentUser.email}
              </Typography>
              <Typography>
                <strong>Teléfono:</strong> {currentUser.phoneNumber}
              </Typography>
              <Typography>
                <strong>Identificación:</strong> {currentUser.idNumber}
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
              <Tab label={`Objetos Perdidos (${lostItems.length})`} />
              <Tab label={`Objetos Encontrados (${foundItems.length})`} />
            </Tabs>

            <TabPanel value={tabValue} index={0}>
              <Box sx={{ p: 3 }}>
                {lostItems.length > 0 ? (
                  lostItems.map((item) => (
                    <Typography key={item.id}>
                      {item.type.label} - {item.description}
                    </Typography>
                  ))
                ) : (
                  <Typography color="text.secondary">
                    No has reportado ningún objeto perdido aún.
                  </Typography>
                )}
              </Box>
            </TabPanel>

            <TabPanel value={tabValue} index={1}>
              <Box sx={{ p: 3 }}>
                {foundItems.length > 0 ? (
                  foundItems.map((item) => (
                    <Typography key={item.id}>
                      {item.type.label} - Encontrado en {item.location}
                    </Typography>
                  ))
                ) : (
                  <Typography color="text.secondary">
                    No has reportado ningún objeto encontrado aún.
                  </Typography>
                )}
              </Box>
            </TabPanel>
          </Paper>
        </Box>
      </Container>
    </AuthLayout>
  );
}
