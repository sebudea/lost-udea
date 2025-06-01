import {
  Container,
  Typography,
  Box,
  Button,
  IconButton,
  Card,
  CardContent,
} from "@mui/material";
import { AuthLayout } from "../components/Layout/AuthLayout";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";
import HandshakeIcon from "@mui/icons-material/Handshake";
import SecurityIcon from "@mui/icons-material/Security";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";

interface ThankYouPageProps {
  isDarkMode: boolean;
  onToggleTheme: () => void;
}

export function ThankYouPage({ isDarkMode, onToggleTheme }: ThankYouPageProps) {
  const navigate = useNavigate();

  return (
    <AuthLayout isDarkMode={isDarkMode} onToggleTheme={onToggleTheme}>
      <Box
        sx={{
          minHeight: "calc(100vh - 64px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          pt: { xs: 2, sm: 4 },
        }}
      >
        <Container
          maxWidth="sm"
          sx={{ pb: { xs: 8, sm: 10 }, px: { xs: 2, sm: 3 } }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              mb: 4,
            }}
          >
            <HandshakeIcon
              sx={{ fontSize: 80, color: "primary.main", mb: 2 }}
            />
            <Typography
              variant="h4"
              component="h1"
              sx={{
                fontWeight: 700,
                fontSize: { xs: "1.75rem", sm: "2.125rem" },
                mb: 2,
              }}
            >
              ¡Nos alegra que hayas encontrado tu objeto!
            </Typography>
            <Typography color="text.secondary" sx={{ mb: 4 }}>
              Gracias por usar Lost UdeA. Tu experiencia nos ayuda a mejorar
              nuestro servicio.
            </Typography>
          </Box>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <Card>
              <CardContent sx={{ textAlign: "left" }}>
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}
                >
                  <SecurityIcon color="primary" />
                  <Typography variant="h6">Prevención</Typography>
                </Box>
                <Typography>
                  Recuerda mantener tus objetos personales seguros y siempre
                  estar pendiente de ellos, especialmente en áreas comunes y de
                  alto tráfico.
                </Typography>
              </CardContent>
            </Card>

            <Card>
              <CardContent sx={{ textAlign: "left" }}>
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}
                >
                  <VolunteerActivismIcon color="primary" />
                  <Typography variant="h6">¡Colabora con otros!</Typography>
                </Box>
                <Typography paragraph>
                  Así como hoy recuperaste tu objeto, puedes ayudar a otros a
                  encontrar los suyos. Si encuentras algo que no te pertenece:
                </Typography>
                <Typography component="div" sx={{ pl: 2 }}>
                  • Repórtalo en nuestra plataforma
                  <br />
                  • Ayuda a mantener la comunidad universitaria unida
                  <br />• Contribuye a crear un campus más solidario
                </Typography>
              </CardContent>
            </Card>

            <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
              <Button
                variant="contained"
                size="large"
                onClick={() => navigate("/home")}
              >
                Volver al Inicio
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>
    </AuthLayout>
  );
}
