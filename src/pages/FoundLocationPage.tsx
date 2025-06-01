import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Button,
  IconButton,
} from "@mui/material";
import { AuthLayout } from "../components/Layout/AuthLayout";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SchoolIcon from "@mui/icons-material/School";
import LocationOnIcon from "@mui/icons-material/LocationOn";

interface FoundLocationPageProps {
  isDarkMode: boolean;
  onToggleTheme: () => void;
}

export function FoundLocationPage({
  isDarkMode,
  onToggleTheme,
}: FoundLocationPageProps) {
  const navigate = useNavigate();
  const { itemId } = useParams();

  const handleLocationSelect = (location: "university" | "outside") => {
    if (location === "university") {
      navigate(`/found-matches/${itemId}`);
    } else {
      navigate(`/thank-you/${itemId}`);
    }
  };

  return (
    <AuthLayout isDarkMode={isDarkMode} onToggleTheme={onToggleTheme}>
      <Box
        sx={{
          minHeight: "calc(100vh - 64px)",
          display: "flex",
          alignItems: "center",
          pt: { xs: 2, sm: 4 },
        }}
      >
        <Container
          maxWidth="sm"
          sx={{ pb: { xs: 8, sm: 10 }, px: { xs: 2, sm: 3 } }}
        >
          <Box sx={{ display: "flex", alignItems: "center", mb: 4, gap: 1 }}>
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
              ¿Dónde encontraste tu objeto?
            </Typography>
          </Box>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <Card
              sx={{
                cursor: "pointer",
                transition: "transform 0.2s",
                "&:hover": {
                  transform: "scale(1.02)",
                },
              }}
              onClick={() => handleLocationSelect("university")}
            >
              <CardContent
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  p: 3,
                }}
              >
                <SchoolIcon sx={{ fontSize: 40, color: "primary.main" }} />
                <Box>
                  <Typography variant="h6" gutterBottom>
                    En la Universidad
                  </Typography>
                  <Typography color="text.secondary">
                    Lo encontré dentro del campus universitario
                  </Typography>
                </Box>
              </CardContent>
            </Card>

            <Card
              sx={{
                cursor: "pointer",
                transition: "transform 0.2s",
                "&:hover": {
                  transform: "scale(1.02)",
                },
              }}
              onClick={() => handleLocationSelect("outside")}
            >
              <CardContent
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  p: 3,
                }}
              >
                <LocationOnIcon sx={{ fontSize: 40, color: "primary.main" }} />
                <Box>
                  <Typography variant="h6" gutterBottom>
                    Fuera de la Universidad
                  </Typography>
                  <Typography color="text.secondary">
                    Lo encontré en otro lugar fuera del campus
                  </Typography>
                </Box>
              </CardContent>
            </Card>
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
