import { Container, Typography, Paper, Box } from "@mui/material";
import { AuthLayout } from "../components/Layout/AuthLayout";

interface HomePageProps {
  isDarkMode: boolean;
  onToggleTheme: () => void;
}

export function HomePage({ isDarkMode, onToggleTheme }: HomePageProps) {
  return (
    <AuthLayout isDarkMode={isDarkMode} onToggleTheme={onToggleTheme}>
      <Container
        maxWidth="md"
        sx={{
          height: "100%",
          display: "flex",
          alignItems: "flex-start",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 4,
            width: "100%",
            py: 2,
          }}
        >
          <Typography variant="h4" component="h1" gutterBottom>
            Bienvenido a Lost UdeA
          </Typography>

          <Paper elevation={2} sx={{ p: 4, borderRadius: 3 }}>
            <Typography variant="h6" gutterBottom>
              Objetos Reportados
            </Typography>
            <Typography color="text.secondary">
              Aquí aparecerán los objetos que has reportado como perdidos o
              encontrados.
            </Typography>
          </Paper>

          <Paper elevation={2} sx={{ p: 4, borderRadius: 3 }}>
            <Typography variant="h6" gutterBottom>
              Coincidencias
            </Typography>
            <Typography color="text.secondary">
              Aquí aparecerán las posibles coincidencias con objetos reportados.
            </Typography>
          </Paper>
        </Box>
      </Container>
    </AuthLayout>
  );
}
