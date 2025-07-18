import {
  Container,
  Typography,
  Paper,
  IconButton,
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Button,
} from "@mui/material";
import { AuthLayout } from "../components/Layout/AuthLayout";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate, useLocation } from "react-router-dom";
import type { FoundItem, LostItem } from "../types/models";

interface SearchResultsPageProps {
  isDarkMode: boolean;
  onToggleTheme: () => void;
}

export function SearchResultsPage({
  isDarkMode,
  onToggleTheme,
}: SearchResultsPageProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { matches, lostItem } = location.state as {
    matches: FoundItem[];
    lostItem: LostItem;
  };

  const hasMatches = matches && matches.length > 0;

  return (
    <AuthLayout isDarkMode={isDarkMode} onToggleTheme={onToggleTheme}>
      <Box
        sx={{
          minHeight: "calc(100vh - 64px)", // Altura total menos el header
          display: "flex",
          alignItems: "center",
        }}
      >
        <Container maxWidth="md" sx={{ py: 6 }}>
          {hasMatches ? (
            <>
              <Typography
                variant="h4"
                component="h1"
                sx={{ fontWeight: 700, mb: 2 }}
              >
                ¡Encontramos posibles coincidencias!
              </Typography>
              <Typography color="text.secondary" sx={{ mb: 4 }}>
                Hemos encontrado algunos objetos que podrían ser el tuyo. Por
                favor, revisa cuidadosamente las siguientes coincidencias:
              </Typography>

              <Grid container spacing={3}>
                {matches.map((item) => (
                  <Grid item xs={12} sm={6} key={item.id}>
                    <Card>
                      {item.image && (
                        <CardMedia
                          component="img"
                          height="200"
                          image={item.image}
                          alt={`Imagen de ${item.type.label}`}
                          sx={{ objectFit: "cover" }}
                        />
                      )}
                      <CardContent>
                        <Typography variant="h6" gutterBottom>
                          {item.type.label}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          paragraph
                        >
                          Encontrado en: {item.location}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          paragraph
                        >
                          Fecha: {new Date(item.foundDate).toLocaleDateString()}
                        </Typography>
                        <Button
                          variant="contained"
                          fullWidth
                          onClick={() => {
                            // Aquí irá la lógica para reclamar el objeto
                            console.log("Reclamar objeto", item.id);
                          }}
                        >
                          Este es mi objeto
                        </Button>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </>
          ) : (
            <Paper
              elevation={2}
              sx={{ p: 4, borderRadius: 3, textAlign: "center" }}
            >
              <Typography variant="h5" component="h1" gutterBottom>
                Reporte Registrado Exitosamente
              </Typography>
              <Box sx={{ my: 3 }}>
                <Typography color="text.secondary" paragraph>
                  Hemos registrado tu reporte del objeto perdido. Para ver las
                  posibles coincidencias de tu objeto, dirígete a "Mis Objetos
                  Perdidos" donde podrás ver y gestionar todas las coincidencias
                  encontradas.
                </Typography>
                <Typography color="text.secondary">
                  Recuerda revisar periódicamente la sección de coincidencias,
                  ya que se actualizan constantemente con nuevos objetos
                  encontrados.
                </Typography>
              </Box>
              <Button
                variant="contained"
                onClick={() => navigate("/my-lost-items")}
                sx={{ mt: 2 }}
              >
                Ver mis reportes
              </Button>
            </Paper>
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
