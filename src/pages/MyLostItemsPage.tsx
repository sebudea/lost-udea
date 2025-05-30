import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Button,
  IconButton,
  Chip,
} from "@mui/material";
import { AuthLayout } from "../components/Layout/AuthLayout";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";
import type { LostItem } from "../features/items/types";
import dayjs from "dayjs";
import CloseIcon from "@mui/icons-material/Close";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import SearchIcon from "@mui/icons-material/Search";

interface MyLostItemsPageProps {
  isDarkMode: boolean;
  onToggleTheme: () => void;
}

export function MyLostItemsPage({
  isDarkMode,
  onToggleTheme,
}: MyLostItemsPageProps) {
  const navigate = useNavigate();

  // Simulación de datos (esto se reemplazará con datos reales de Firebase)
  const mockLostItems: LostItem[] = [
    {
      id: "1",
      type: "Computador Portátil",
      locations: ["Bloque 21 - Fac. de Ingeniería", "Biblioteca Central"],
      lostDate: new Date(),
      description:
        "MacBook Pro 13 pulgadas, color gris espacial, con sticker de React en la tapa",
      status: "searching",
      seekerId: "user123",
      imageUrl:
        "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-4.0.3",
    },
    {
      id: "2",
      type: "Mochila",
      locations: ["Cafetería Central", "Bloque 14 - Fac. Ciencias Económicas"],
      lostDate: new Date(Date.now() - 86400000 * 2), // hace 2 días
      description:
        "Mochila negra marca Totto con libros de cálculo y un estuche azul",
      status: "searching",
      seekerId: "user123",
      imageUrl:
        "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3",
    },
    {
      id: "3",
      type: "Audífonos Inalámbricos",
      locations: ["Coliseo Universitario", "Bloque 12 - Educación Física"],
      lostDate: new Date(Date.now() - 86400000), // ayer
      description:
        "AirPods Pro con estuche de carga, tiene un pequeño rasguño en la parte trasera del estuche",
      status: "searching",
      seekerId: "user123",
      imageUrl:
        "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?ixlib=rb-4.0.3",
    },
  ];

  return (
    <AuthLayout isDarkMode={isDarkMode} onToggleTheme={onToggleTheme}>
      <Box
        sx={{
          minHeight: "calc(100vh - 64px)",
          display: "flex",
          alignItems: "flex-start",
          pt: 4,
        }}
      >
        <Container maxWidth="md" sx={{ pb: 10 }}>
          <Typography
            variant="h4"
            component="h1"
            sx={{ fontWeight: 700, mb: 3 }}
          >
            Mis Objetos Perdidos
          </Typography>

          {mockLostItems.length > 0 ? (
            <Grid container spacing={3}>
              {mockLostItems.map((item) => (
                <Grid item xs={12} key={item.id}>
                  <Card sx={{ display: "flex", height: "220px" }}>
                    {item.imageUrl && (
                      <Box
                        sx={{
                          width: "180px",
                          flexShrink: 0,
                          overflow: "hidden",
                          position: "relative",
                        }}
                      >
                        <CardMedia
                          component="img"
                          sx={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            objectPosition: "center",
                          }}
                          image={item.imageUrl}
                          alt={`Imagen de ${item.type}`}
                        />
                      </Box>
                    )}
                    <Box
                      sx={{
                        flex: 1,
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <CardContent
                        sx={{
                          flex: 1,
                          pb: 1,
                          overflow: "auto",
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            mb: 2,
                          }}
                        >
                          <Typography variant="h6" sx={{ mb: 0 }}>
                            {item.type}
                          </Typography>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1.5,
                            }}
                          >
                            <Button
                              size="small"
                              color="info"
                              startIcon={<SearchIcon fontSize="small" />}
                              onClick={() => {
                                console.log("Ver coincidencias de", item.id);
                              }}
                              sx={{
                                height: "24px",
                                textTransform: "none",
                                fontSize: "0.8125rem",
                                px: 1,
                                borderRadius: "16px",
                                bgcolor: "info.main",
                                color: "white",
                                "&:hover": {
                                  bgcolor: "info.dark",
                                },
                              }}
                            >
                              2 coincidencias
                            </Button>
                            <Button
                              size="small"
                              color="error"
                              startIcon={<CloseIcon fontSize="small" />}
                              onClick={() => {
                                console.log("Desistir de", item.id);
                              }}
                              sx={{
                                height: "24px",
                                textTransform: "none",
                                fontSize: "0.8125rem",
                                px: 1,
                                borderRadius: "16px",
                                bgcolor: "error.main",
                                color: "white",
                                "&:hover": {
                                  bgcolor: "error.dark",
                                },
                              }}
                            >
                              Desistir
                            </Button>
                            <Button
                              size="small"
                              color="success"
                              startIcon={<CheckCircleIcon fontSize="small" />}
                              onClick={() => {
                                console.log("Encontrado", item.id);
                              }}
                              sx={{
                                height: "24px",
                                textTransform: "none",
                                fontSize: "0.8125rem",
                                px: 1,
                                borderRadius: "16px",
                                bgcolor: "success.main",
                                color: "white",
                                "&:hover": {
                                  bgcolor: "success.dark",
                                },
                              }}
                            >
                              ¡Lo Encontre!
                            </Button>
                          </Box>
                        </Box>

                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ mb: 1 }}
                        >
                          <strong>Fecha de pérdida:</strong>{" "}
                          {dayjs(item.lostDate).format("DD/MM/YYYY")}
                        </Typography>

                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ mb: 1 }}
                        >
                          <strong>Posibles ubicaciones:</strong>
                          <ul style={{ margin: "4px 0" }}>
                            {item.locations.map((location, index) => (
                              <li key={index}>{location}</li>
                            ))}
                          </ul>
                        </Typography>

                        <Typography variant="body2">
                          {item.description}
                        </Typography>
                      </CardContent>
                    </Box>
                  </Card>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Card sx={{ textAlign: "center", py: 4 }}>
              <CardContent>
                <Typography color="text.secondary">
                  No tienes objetos perdidos reportados actualmente.
                </Typography>
                <Button
                  variant="contained"
                  onClick={() => navigate("/report")}
                  sx={{ mt: 2 }}
                >
                  Reportar un objeto
                </Button>
              </CardContent>
            </Card>
          )}
        </Container>
      </Box>

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
    </AuthLayout>
  );
}
