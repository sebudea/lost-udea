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

interface FoundMatchesPageProps {
  isDarkMode: boolean;
  onToggleTheme: () => void;
}

interface FoundItem {
  id: string;
  type: string;
  location: string;
  foundDate: Date;
  description: string;
  image: string;
  status: "pending" | "delivered" | "matched";
  finderId: string;
}

export function FoundMatchesPage({
  isDarkMode,
  onToggleTheme,
}: FoundMatchesPageProps) {
  const navigate = useNavigate();
  const { itemId } = useParams();
  const [selectedMatch, setSelectedMatch] = useState<string>("");

  // Simulación de datos (esto se reemplazará con datos reales de Firebase)
  const mockMatches: FoundItem[] = [
    {
      id: "1",
      type: "Computador Portátil",
      location: "Bloque 21 - Fac. de Ingeniería",
      foundDate: new Date(),
      description:
        "MacBook Pro encontrado en el salón 21-301, color gris espacial",
      image:
        "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-4.0.3",
      status: "pending",
      finderId: "finder123",
    },
    {
      id: "2",
      type: "Computador Portátil",
      location: "Biblioteca Central",
      foundDate: new Date(Date.now() - 86400000),
      description: "Laptop encontrada en la sala de estudio del 2do piso",
      image:
        "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?ixlib=rb-4.0.3",
      status: "pending",
      finderId: "finder456",
    },
  ];

  const handleConfirmMatch = () => {
    if (selectedMatch) {
      navigate(`/thank-you/${itemId}`);
    }
  };

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
            coincide, puedes volver atrás y seleccionar "Fuera de la
            Universidad".
          </Typography>

          <FormControl component="fieldset" sx={{ width: "100%" }}>
            <RadioGroup
              value={selectedMatch}
              onChange={(e) => setSelectedMatch(e.target.value)}
            >
              <Grid container spacing={3}>
                {mockMatches.map((match) => (
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
                      <CardMedia
                        component="img"
                        sx={{
                          width: { xs: "100%", sm: "200px" },
                          height: { xs: "200px", sm: "100%" },
                          objectFit: "cover",
                        }}
                        image={match.image}
                        alt={match.type}
                      />
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
                                {match.type}
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
                              <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{ mt: 1 }}
                              >
                                {match.description}
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

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mt: 4,
            }}
          >
            <Button
              variant="contained"
              size="large"
              disabled={!selectedMatch}
              onClick={handleConfirmMatch}
            >
              Confirmar Selección
            </Button>
          </Box>
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
