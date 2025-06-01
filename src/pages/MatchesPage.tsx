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

interface MatchesPageProps {
  isDarkMode: boolean;
  onToggleTheme: () => void;
}

// Tipo temporal para simular datos (esto vendrá de Firebase)
interface FoundItem {
  id: string;
  type: string;
  location: string;
  foundDate: Date;
  description: string;
  status: "pending" | "delivered" | "matched";
  finderId: string;
}

export function MatchesPage({ isDarkMode, onToggleTheme }: MatchesPageProps) {
  const navigate = useNavigate();
  const { itemId } = useParams();

  // Simulación de datos (esto se reemplazará con datos reales de Firebase)
  const mockMatches: FoundItem[] = [
    {
      id: "1",
      type: "Computador Portátil",
      location: "Bloque 21 - Fac. de Ingeniería",
      foundDate: new Date(),
      description:
        "MacBook Pro encontrado en el salón 21-301, color gris espacial",
      status: "pending",
      finderId: "finder123",
    },
    {
      id: "2",
      type: "Computador Portátil",
      location: "Biblioteca Central",
      foundDate: new Date(Date.now() - 86400000), // ayer
      description: "Laptop encontrada en la sala de estudio del 2do piso",
      status: "pending",
      finderId: "finder456",
    },
  ];

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

          {mockMatches.length > 0 ? (
            <Grid container spacing={3}>
              {mockMatches.map((match) => (
                <Grid item xs={12} key={match.id}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        {match.type}
                      </Typography>

                      <Box sx={{ mt: 2 }}>
                        <Typography variant="body2" color="text.secondary">
                          <strong>Ubicación:</strong> {match.location}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          <strong>Fecha de encuentro:</strong>{" "}
                          {dayjs(match.foundDate).format("DD/MM/YYYY")}
                        </Typography>
                        <Divider sx={{ my: 1.5 }} />
                        <Typography variant="body2">
                          <strong>Descripción:</strong>
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          paragraph
                        >
                          {match.description}
                        </Typography>
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
