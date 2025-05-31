import { Container, Typography, Paper } from "@mui/material";
import { AuthLayout } from "../components/Layout/AuthLayout";
import { ReportLostItemForm } from "../features/items/ReportLostItemForm";

interface ReportPageProps {
  isDarkMode: boolean;
  onToggleTheme: () => void;
}

export function ReportPage({ isDarkMode, onToggleTheme }: ReportPageProps) {
  return (
    <AuthLayout isDarkMode={isDarkMode} onToggleTheme={onToggleTheme}>
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
