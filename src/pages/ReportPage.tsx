import { Container, Typography, Paper, IconButton } from "@mui/material";
import { AuthLayout } from "../components/Layout/AuthLayout";
import { ReportLostItemForm } from "../features/items/ReportLostItemForm";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";

interface ReportPageProps {
  isDarkMode: boolean;
  onToggleTheme: () => void;
}

export function ReportPage({ isDarkMode, onToggleTheme }: ReportPageProps) {
  const navigate = useNavigate();

  return (
    <AuthLayout isDarkMode={isDarkMode} onToggleTheme={onToggleTheme}>
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
      <Container maxWidth="md" sx={{ pb: 6 }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 700, mb: 2 }}>
          Reportar Objeto Perdido
        </Typography>

        <Typography color="text.secondary" sx={{ mb: 4 }}>
          Por favor, proporciona la mayor cantidad de detalles posible para
          ayudarnos a encontrar tu objeto.
        </Typography>

        <Paper
          elevation={2}
          sx={{
            p: 4,
            borderRadius: 3,
          }}
        >
          <ReportLostItemForm />
        </Paper>
      </Container>
    </AuthLayout>
  );
}
