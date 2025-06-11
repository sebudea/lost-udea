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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { AuthLayout } from "../components/Layout/AuthLayout";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";
import type { LostItem } from "../types/models";
import { Location } from "../types/enums";
import dayjs from "dayjs";
import CloseIcon from "@mui/icons-material/Close";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import { useItemsStore } from "../stores/itemsStore";
import { useUserStore } from "../stores/userStore";

interface MyLostItemsPageProps {
  isDarkMode: boolean;
  onToggleTheme: () => void;
}

export function MyLostItemsPage({
  isDarkMode,
  onToggleTheme,
}: MyLostItemsPageProps) {
  const navigate = useNavigate();
  const [itemToDelete, setItemToDelete] = useState<LostItem | null>(null);
  const [itemFound, setItemFound] = useState<LostItem | null>(null);

  const currentUser = useUserStore((state) => state.currentUser);
  const { getLostItemsByUser, deleteLostItem, updateLostItem } =
    useItemsStore();

  const lostItems = currentUser ? getLostItemsByUser(currentUser.id) : [];

  if (!currentUser) {
    navigate("/");
    return null;
  }

  const handleDesist = (item: LostItem) => {
    setItemToDelete(item);
  };

  const handleConfirmDesist = () => {
    if (itemToDelete) {
      deleteLostItem(itemToDelete.id);
      setItemToDelete(null);
    }
  };

  const handleCloseDialog = () => {
    setItemToDelete(null);
  };

  const handleFound = (item: LostItem) => {
    setItemFound(item);
  };

  const handleConfirmFound = () => {
    if (itemFound) {
      updateLostItem(itemFound.id, { status: "found" });
      navigate(`/found-location/${itemFound.id}`);
      setItemFound(null);
    }
  };

  const handleCloseFoundDialog = () => {
    setItemFound(null);
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
          <Typography
            variant="h4"
            component="h1"
            sx={{
              fontWeight: 700,
              mb: { xs: 2, sm: 3 },
              fontSize: { xs: "1.75rem", sm: "2.125rem" },
            }}
          >
            Mis Objetos Perdidos
          </Typography>

          {lostItems.length > 0 ? (
            <Grid container spacing={3}>
              {lostItems.map((item) => (
                <Grid item xs={12} key={item.id}>
                  <Card>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: { xs: "column", sm: "row" },
                        height: { xs: "auto", sm: "220px" },
                      }}
                    >
                      {item.imageUrl && (
                        <Box
                          sx={{
                            width: { xs: "100%", sm: "180px" },
                            height: { xs: "200px", sm: "100%" },
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
                            alt={`Imagen de ${item.type.label}`}
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
                              flexDirection: { xs: "column", sm: "row" },
                              justifyContent: "space-between",
                              alignItems: { xs: "flex-start", sm: "center" },
                              gap: { xs: 2, sm: 0 },
                              mb: 2,
                            }}
                          >
                            <Typography variant="h6" sx={{ mb: 0 }}>
                              {item.type.label}
                            </Typography>
                            <Box
                              sx={{
                                display: "flex",
                                flexDirection: { xs: "column", sm: "row" },
                                alignItems: { xs: "stretch", sm: "center" },
                                gap: 1,
                                width: { xs: "100%", sm: "auto" },
                              }}
                            >
                              <Button
                                size="small"
                                color="info"
                                startIcon={<SearchIcon fontSize="small" />}
                                onClick={() => {
                                  navigate(`/matches/${item.id}`);
                                }}
                                sx={{
                                  height: { xs: "32px", sm: "24px" },
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
                                onClick={() => handleDesist(item)}
                                sx={{
                                  height: { xs: "32px", sm: "24px" },
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
                                onClick={() => handleFound(item)}
                                sx={{
                                  height: { xs: "32px", sm: "24px" },
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
                                ¡Lo Encontré!
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
                              {item.locations.map(
                                (location: string, index: number) => (
                                  <li key={index}>{location}</li>
                                )
                              )}
                            </ul>
                          </Typography>

                          <Typography variant="body2">
                            {item.description}
                          </Typography>
                        </CardContent>
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

      <Dialog
        open={itemToDelete !== null}
        onClose={handleCloseDialog}
        aria-labelledby="desist-dialog-title"
      >
        <DialogTitle id="desist-dialog-title">
          ¿Deseas desistir de este objeto?
        </DialogTitle>
        <DialogContent>
          <Typography>
            Esta acción eliminará el objeto de tu lista de objetos perdidos y no
            podrás recibir más coincidencias para él.
          </Typography>
          {itemToDelete && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle2" color="text.secondary">
                Objeto: {itemToDelete.type.label}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Fecha de pérdida:{" "}
                {dayjs(itemToDelete.lostDate).format("DD/MM/YYYY")}
              </Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="inherit">
            Cancelar
          </Button>
          <Button
            onClick={handleConfirmDesist}
            color="error"
            variant="contained"
            startIcon={<CloseIcon />}
          >
            Sí, Desistir
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={itemFound !== null}
        onClose={handleCloseFoundDialog}
        aria-labelledby="found-dialog-title"
      >
        <DialogTitle id="found-dialog-title">
          ¿Has encontrado tu objeto?
        </DialogTitle>
        <DialogContent>
          <Typography>
            ¡Nos alegra que hayas encontrado tu objeto! A continuación te
            haremos algunas preguntas para mejorar nuestro servicio.
          </Typography>
          {itemFound && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle2" color="text.secondary">
                Objeto: {itemFound.type.label}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Fecha de pérdida:{" "}
                {dayjs(itemFound.lostDate).format("DD/MM/YYYY")}
              </Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseFoundDialog} color="inherit">
            Cancelar
          </Button>
          <Button
            onClick={handleConfirmFound}
            color="success"
            variant="contained"
            startIcon={<CheckCircleIcon />}
          >
            Sí, lo encontré
          </Button>
        </DialogActions>
      </Dialog>
    </AuthLayout>
  );
}
