import { Container, Typography, Paper, Box, Button } from "@mui/material";
import { AuthLayout } from "../components/Layout/AuthLayout";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import CategoryIcon from "@mui/icons-material/Category";

interface HomePageProps {
  isDarkMode: boolean;
  onToggleTheme: () => void;
}

export function HomePage({ isDarkMode, onToggleTheme }: HomePageProps) {
  const navigate = useNavigate();

  return (
    <AuthLayout isDarkMode={isDarkMode} onToggleTheme={onToggleTheme}>
      <Container
        maxWidth="md"
        sx={{
          minHeight: "calc(100vh - 64px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          py: 4,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 4,
            width: "100%",
          }}
        >
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            align="center"
            sx={{ fontWeight: 700 }}
          >
            Bienvenido a Lost UdeA
          </Typography>

          <Paper
            elevation={2}
            sx={{
              p: 4,
              borderRadius: 3,
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <Typography variant="h6" gutterBottom>
              Reportar Objeto Perdido
            </Typography>
            <Typography color="text.secondary" paragraph>
              ¿Perdiste algo? Repórtalo aquí y te ayudaremos a encontrarlo.
            </Typography>
            <Button
              variant="contained"
              size="large"
              startIcon={<CategoryIcon />}
              onClick={() => navigate("/report")}
            >
              Reportar Objeto
            </Button>
          </Paper>

          <Paper
            elevation={2}
            sx={{
              p: 4,
              borderRadius: 3,
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <Typography variant="h6" gutterBottom>
              Mis Objetos Perdidos
            </Typography>
            <Typography color="text.secondary" paragraph>
              Aquí podrás ver el estado de tus objetos perdidos y sus posibles
              coincidencias.
            </Typography>
            <Button
              variant="outlined"
              size="large"
              startIcon={<SearchIcon />}
              onClick={() => navigate("/my-lost-items")}
            >
              Ver Mis Objetos
            </Button>
          </Paper>
        </Box>
      </Container>
    </AuthLayout>
  );
}
