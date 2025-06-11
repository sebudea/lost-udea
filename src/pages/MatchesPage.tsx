import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Grid,
  Button,
  IconButton,
  Divider,
} from "@mui/material";
import { AuthLayout } from "../components/Layout/AuthLayout";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useItemsStore } from "../stores/itemsStore";
import type { FoundItem } from "../types/models";

interface MatchesPageProps {
  isDarkMode: boolean;
  onToggleTheme: () => void;
}

export function MatchesPage({ isDarkMode, onToggleTheme }: MatchesPageProps) {
  const navigate = useNavigate();
  const { itemId } = useParams();
  const { foundItems, getLostItemById } = useItemsStore();

  // Obtener el objeto perdido actual
  const currentLostItem = itemId ? getLostItemById(itemId) : null;

  // Filtrar los objetos encontrados que coinciden por tipo
  const matches = currentLostItem
    ? foundItems.filter(
        (foundItem) =>
          foundItem.type.value === currentLostItem.type.value &&
          foundItem.status === "pending"
      )
    : [];

  return (
    <AuthLayout isDarkMode={isDarkMode} onToggleTheme={onToggleTheme}>
      <Box
        sx={{
          minHeight: "calc(100vh - 64px)",
          display: "flex",
          alignItems: "flex-start",
          pt: { xs: 2, sm: 4 },
        }}
      >
        <Container
          maxWidth="md"
          sx={{ pb: { xs: 8, sm: 10 }, px: { xs: 2, sm: 3 } }}
        >
          <Box sx={{ display: "flex", alignItems: "center", mb: 3, gap: 1 }}>
            <IconButton
              onClick={() => navigate("/my-lost-items")}
              sx={{ color: "text.primary" }}
            >
              <ArrowBackIcon />
            </IconButton>
            <Typography
              variant="h4"
              component="h1"
              sx={{
                fontWeight: 700,
                fontSize: { xs: "1.75rem", sm: "2.125rem" },
              }}
            >
              Coincidencias
            </Typography>
          </Box>

          {!currentLostItem ? (
            <Card sx={{ textAlign: "center", py: 4 }}>
              <CardContent>
                <Typography color="text.secondary">
                  No se pudo encontrar el objeto perdido.
                </Typography>
              </CardContent>
            </Card>
          ) : matches.length > 0 ? (
            <Grid container spacing={3}>
              {matches.map((match) => (
                <Grid item xs={12} key={match.id}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        {match.type.label}
                      </Typography>

                      <Box sx={{ mt: 2 }}>
                        <Typography variant="body2" color="text.secondary">
                          <strong>Ubicación:</strong> {match.location}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          <strong>Fecha de encuentro:</strong>{" "}
                          {dayjs(match.foundDate).format("DD/MM/YYYY")}
                        </Typography>
                        {match.image && (
                          <Box sx={{ mt: 2, mb: 2 }}>
                            <img
                              src={match.image}
                              alt="Imagen del objeto"
                              style={{
                                maxWidth: "100%",
                                maxHeight: "200px",
                                borderRadius: "8px",
                              }}
                            />
                          </Box>
                        )}
                      </Box>

                      <Box
                        sx={{
                          mt: 2,
                          display: "flex",
                          justifyContent: "flex-end",
                        }}
                      >
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => {
                            // Aquí implementaremos la verificación de coincidencia
                            console.log("Verificar coincidencia", match.id);
                          }}
                        >
                          Verificar Coincidencia
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Card sx={{ textAlign: "center", py: 4 }}>
              <CardContent>
                <Typography color="text.secondary">
                  No se encontraron coincidencias para este objeto.
                </Typography>
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
