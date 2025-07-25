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
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { AuthLayout } from "../components/Layout/AuthLayout";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useItemsStore } from "../stores/itemsStore";
import type { FoundItem } from "../types/models";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import ImageNotSupportedIcon from "@mui/icons-material/ImageNotSupported";
import { useState } from "react";

interface MatchesPageProps {
  isDarkMode: boolean;
  onToggleTheme: () => void;
}

export function MatchesPage({ isDarkMode, onToggleTheme }: MatchesPageProps) {
  const navigate = useNavigate();
  const { itemId } = useParams();
  const { foundItems, getLostItemById, createMatch } = useItemsStore();
  const [matchToVerify, setMatchToVerify] = useState<FoundItem | null>(null);

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

  const handleVerifyMatch = (matchId: string) => {
    if (itemId) {
      createMatch(itemId, matchId);
      navigate(`/thank-you/${itemId}`);
    }
  };

  const handleOpenVerifyDialog = (match: FoundItem) => {
    setMatchToVerify(match);
  };

  const handleCloseVerifyDialog = () => {
    setMatchToVerify(null);
  };

  const handleConfirmVerify = () => {
    if (matchToVerify) {
      handleVerifyMatch(matchToVerify.id);
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

          {currentLostItem && (
            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" gutterBottom>
                Tu objeto perdido:
              </Typography>
              <Card sx={{ bgcolor: "action.hover" }}>
                <CardContent>
                  <Typography variant="h6" color="primary" gutterBottom>
                    {currentLostItem.type.label}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {currentLostItem.description}
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          )}

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
                  <Card
                    sx={{
                      transition: "transform 0.2s, box-shadow 0.2s",
                      "&:hover": {
                        transform: "translateY(-4px)",
                        boxShadow: (theme) => theme.shadows[4],
                      },
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: { xs: "column", sm: "row" },
                      }}
                    >
                      <Box
                        sx={{
                          width: { xs: "100%", sm: "240px" },
                          height: { xs: "240px", sm: "240px" },
                          position: "relative",
                          bgcolor: "action.hover",
                        }}
                      >
                        {match.image ? (
                          <CardMedia
                            component="img"
                            sx={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                            }}
                            image={match.image}
                            alt={match.type.label}
                          />
                        ) : (
                          <Box
                            sx={{
                              width: "100%",
                              height: "100%",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <ImageNotSupportedIcon
                              sx={{
                                fontSize: 80,
                                color: "text.secondary",
                                opacity: 0.5,
                              }}
                            />
                          </Box>
                        )}
                      </Box>

                      <Box sx={{ flex: 1, p: 3 }}>
                        <Typography variant="h6" gutterBottom>
                          {match.type.label}
                        </Typography>

                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 1,
                            mb: 3,
                          }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                            }}
                          >
                            <LocationOnIcon color="action" fontSize="small" />
                            <Typography variant="body2" color="text.secondary">
                              {match.location}
                            </Typography>
                          </Box>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                            }}
                          >
                            <CalendarTodayIcon
                              color="action"
                              fontSize="small"
                            />
                            <Typography variant="body2" color="text.secondary">
                              {dayjs(match.foundDate).format("DD/MM/YYYY")}
                            </Typography>
                          </Box>
                        </Box>

                        <Button
                          variant="contained"
                          color="primary"
                          fullWidth
                          onClick={() => handleOpenVerifyDialog(match)}
                          sx={{
                            mt: "auto",
                            py: 1.5,
                            fontWeight: "bold",
                            boxShadow: (theme) =>
                              `0 4px 12px ${theme.palette.primary.main}40`,
                          }}
                        >
                          Verificar Coincidencia
                        </Button>
                      </Box>
                    </Box>
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

      <Dialog
        open={matchToVerify !== null}
        onClose={handleCloseVerifyDialog}
        aria-labelledby="verify-dialog-title"
      >
        <DialogTitle id="verify-dialog-title">¿Este es tu objeto?</DialogTitle>
        <DialogContent>
          <Typography sx={{ mb: 2 }}>
            ¡Genial! Antes de proceder con la verificación, por favor confirma
            que este objeto coincide con el que estás buscando. Revisa
            cuidadosamente los detalles:
          </Typography>
          {matchToVerify && (
            <Box sx={{ mb: 3, p: 2, bgcolor: "action.hover", borderRadius: 1 }}>
              <Typography variant="subtitle2" color="primary" gutterBottom>
                Detalles del objeto encontrado:
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                <strong>Tipo:</strong> {matchToVerify.type.label}
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                <strong>Ubicación:</strong> {matchToVerify.location}
              </Typography>
              <Typography variant="body2">
                <strong>Fecha de encuentro:</strong>{" "}
                {dayjs(matchToVerify.foundDate).format("DD/MM/YYYY")}
              </Typography>
            </Box>
          )}
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            Al confirmar esta coincidencia:
          </Typography>
          <Box component="ul" sx={{ mt: 1, pl: 2 }}>
            <Typography component="li" variant="body2" color="text.secondary">
              Podrás coordinar la recuperación de tu objeto
            </Typography>
            <Typography component="li" variant="body2" color="text.secondary">
              El objeto se marcará como emparejado y se retirará de la lista de
              búsqueda
            </Typography>
            <Typography component="li" variant="body2" color="text.secondary">
              Te ayudaremos con los siguientes pasos para recuperar tu objeto
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseVerifyDialog} color="inherit">
            No es mi objeto
          </Button>
          <Button
            onClick={handleConfirmVerify}
            color="primary"
            variant="contained"
          >
            ¡Sí, es mi objeto!
          </Button>
        </DialogActions>
      </Dialog>

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
