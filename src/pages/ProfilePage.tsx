import {
  Container,
  Typography,
  Paper,
  Box,
  Tabs,
  Tab,
  IconButton,
  Card,
  CardContent,
  Grid,
  Chip,
} from "@mui/material";
import { AuthLayout } from "../components/Layout/AuthLayout";
import { useState } from "react";
import { TabPanel } from "../components/TabPanel/TabPanel";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../stores/userStore";
import { useItemsStore } from "../stores/itemsStore";
import dayjs from "dayjs";

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
                  <Grid container spacing={2}>
                    {lostItems.map((item) => (
                      <Grid item xs={12} key={item.id}>
                        <Card
                          sx={{
                            bgcolor: "background.paper",
                            transition: "transform 0.2s",
                            "&:hover": {
                              transform: "translateY(-2px)",
                            },
                          }}
                        >
                          <CardContent>
                            <Box
                              sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "flex-start",
                                mb: 1,
                              }}
                            >
                              <Typography variant="h6" component="div">
                                {item.type.label}
                              </Typography>
                              <Chip
                                label={
                                  item.status === "pending"
                                    ? "Pendiente"
                                    : item.status === "found"
                                    ? "Encontrado"
                                    : item.status === "matched"
                                    ? "Emparejado"
                                    : "Desistido"
                                }
                                color={
                                  item.status === "pending"
                                    ? "warning"
                                    : item.status === "found"
                                    ? "success"
                                    : item.status === "matched"
                                    ? "info"
                                    : "default"
                                }
                                size="small"
                                sx={
                                  item.status === "desisted"
                                    ? {
                                        bgcolor: "grey.500",
                                        color: "white",
                                      }
                                    : undefined
                                }
                              />
                            </Box>
                            <Typography
                              variant="body2"
                              color="text.secondary"
                              sx={{ mb: 1 }}
                            >
                              Fecha de pérdida:{" "}
                              {dayjs(item.lostDate).format("DD/MM/YYYY")}
                            </Typography>
                            <Typography variant="body2">
                              {item.description}
                            </Typography>
                            {item.locations && item.locations.length > 0 && (
                              <Box sx={{ mt: 1 }}>
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                >
                                  Ubicaciones posibles:
                                </Typography>
                                <Box
                                  sx={{
                                    display: "flex",
                                    flexWrap: "wrap",
                                    gap: 0.5,
                                    mt: 0.5,
                                  }}
                                >
                                  {item.locations.map((location, index) => (
                                    <Chip
                                      key={index}
                                      label={location}
                                      size="small"
                                      variant="outlined"
                                    />
                                  ))}
                                </Box>
                              </Box>
                            )}
                          </CardContent>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                ) : (
                  <Typography color="text.secondary" textAlign="center">
                    No has reportado ningún objeto perdido aún.
                  </Typography>
                )}
              </Box>
            </TabPanel>

            <TabPanel value={tabValue} index={1}>
              <Box sx={{ p: 3 }}>
                {foundItems.length > 0 ? (
                  <Grid container spacing={2}>
                    {foundItems.map((item) => (
                      <Grid item xs={12} key={item.id}>
                        <Card
                          sx={{
                            bgcolor: "background.paper",
                            transition: "transform 0.2s",
                            "&:hover": {
                              transform: "translateY(-2px)",
                            },
                          }}
                        >
                          <CardContent>
                            <Box
                              sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "flex-start",
                                mb: 1,
                              }}
                            >
                              <Typography variant="h6" component="div">
                                {item.type.label}
                              </Typography>
                              <Chip
                                label={
                                  item.status === "pending"
                                    ? "Pendiente"
                                    : item.status === "delivered"
                                    ? "Entregado"
                                    : item.status === "matched"
                                    ? "Emparejado"
                                    : "Desconocido"
                                }
                                color={
                                  item.status === "pending"
                                    ? "warning"
                                    : item.status === "delivered"
                                    ? "success"
                                    : item.status === "matched"
                                    ? "info"
                                    : "default"
                                }
                                size="small"
                              />
                            </Box>
                            <Typography
                              variant="body2"
                              color="text.secondary"
                              sx={{ mb: 1 }}
                            >
                              Fecha de encuentro:{" "}
                              {dayjs(item.foundDate).format("DD/MM/YYYY")}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              Encontrado en: {item.location}
                            </Typography>
                          </CardContent>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                ) : (
                  <Typography color="text.secondary" textAlign="center">
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
