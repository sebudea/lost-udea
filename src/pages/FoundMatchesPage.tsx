import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Grid,
  Button,
  IconButton,
  CardMedia,
  Radio,
  FormControlLabel,
  RadioGroup,
  FormControl,
} from "@mui/material";
import { AuthLayout } from "../components/Layout/AuthLayout";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useState } from "react";
import dayjs from "dayjs";
import { useItemsStore } from "../stores/itemsStore";
import type { FoundItem } from "../types/models";

interface FoundMatchesPageProps {
  isDarkMode: boolean;
  onToggleTheme: () => void;
}

export function FoundMatchesPage({
  isDarkMode,
  onToggleTheme,
}: FoundMatchesPageProps) {
  const navigate = useNavigate();
  const { itemId } = useParams();
  const [selectedMatch, setSelectedMatch] = useState<string>("");

  const { foundItems, getLostItemById, createMatch } = useItemsStore();

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

  const handleConfirmMatch = () => {
    if (selectedMatch && itemId) {
      // Crear el match y actualizar estados
      createMatch(itemId, selectedMatch);
      // Navegar a la página de agradecimiento
      navigate(`/thank-you/${itemId}`);
    }
  };

  if (!currentLostItem) {
    return (
      <AuthLayout isDarkMode={isDarkMode} onToggleTheme={onToggleTheme}>
        <Container maxWidth="md" sx={{ py: 4 }}>
          <Typography color="text.secondary" align="center">
            No se pudo encontrar el objeto perdido.
          </Typography>
        </Container>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout isDarkMode={isDarkMode} onToggleTheme={onToggleTheme}>
      <Box
        sx={{
          minHeight: "calc(100vh - 64px)",
          display: "flex",
          alignItems: "flex-start",
          pt: { xs: 2, sm: 4 },
          pb: { xs: 10, sm: 12 },
        }}
      >
        <Container
          maxWidth="md"
          sx={{ pb: { xs: 8, sm: 10 }, px: { xs: 2, sm: 3 } }}
        >
          <Box sx={{ display: "flex", alignItems: "center", mb: 3, gap: 1 }}>
            <IconButton
              onClick={() => navigate(-1)}
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
              ¿Es alguno de estos tu objeto?
            </Typography>
          </Box>

          <Typography color="text.secondary" sx={{ mb: 3 }}>
            Selecciona el objeto que coincide con el que perdiste. Si ninguno
            coincide, puedes volver atrás.
          </Typography>

          {matches.length > 0 ? (
            <FormControl component="fieldset" sx={{ width: "100%" }}>
              <RadioGroup
                value={selectedMatch}
                onChange={(e) => setSelectedMatch(e.target.value)}
              >
                <Grid container spacing={3}>
                  {matches.map((match) => (
                    <Grid item xs={12} key={match.id}>
                      <Card
                        sx={{
                          display: "flex",
                          flexDirection: { xs: "column", sm: "row" },
                          cursor: "pointer",
                          transition: "transform 0.2s",
                          "&:hover": {
                            transform: "scale(1.01)",
                          },
                        }}
                        onClick={() => setSelectedMatch(match.id)}
                      >
                        {match.image && (
                          <CardMedia
                            component="img"
                            sx={{
                              width: { xs: "100%", sm: "200px" },
                              height: { xs: "200px", sm: "100%" },
                              objectFit: "cover",
                            }}
                            image={match.image}
                            alt={match.type.label}
                          />
                        )}
                        <Box sx={{ display: "flex", flex: 1 }}>
                          <CardContent sx={{ flex: 1 }}>
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "flex-start",
                                mb: 2,
                              }}
                            >
                              <FormControlLabel
                                value={match.id}
                                control={<Radio />}
                                label=""
                                sx={{ mr: 1 }}
                              />
                              <Box>
                                <Typography variant="h6" gutterBottom>
                                  {match.type.label}
                                </Typography>
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                >
                                  <strong>Ubicación:</strong> {match.location}
                                </Typography>
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                >
                                  <strong>Fecha de encuentro:</strong>{" "}
                                  {dayjs(match.foundDate).format("DD/MM/YYYY")}
                                </Typography>
                              </Box>
                            </Box>
                          </CardContent>
                        </Box>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </RadioGroup>
            </FormControl>
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

      <Box
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          py: 2,
          px: 2,
          bgcolor: "background.paper",
          borderTop: 1,
          borderColor: "divider",
          display: "flex",
          justifyContent: "center",
          zIndex: 1000,
          boxShadow: "0px -2px 8px rgba(0,0,0,0.1)",
        }}
      >
        <Button
          variant="contained"
          size="large"
          disabled={!selectedMatch}
          onClick={handleConfirmMatch}
          sx={{
            minWidth: { xs: "100%", sm: "300px" },
            height: "48px",
            fontSize: "1.1rem",
            fontWeight: "bold",
            boxShadow: (theme) => `0 4px 12px ${theme.palette.primary.main}40`,
          }}
        >
          {selectedMatch ? "Confirmar Selección" : "Selecciona un objeto"}
        </Button>
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
