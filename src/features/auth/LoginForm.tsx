import { Box, Button, Typography } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import { useNavigate } from "react-router-dom";

export function LoginForm() {
  const navigate = useNavigate();

  const handleLogin = () => {
    // Aquí iría la autenticación con Google
    // Por ahora, simulamos que es un usuario nuevo y lo enviamos a registro
    navigate("/register");
  };

  return (
    <Box sx={{ textAlign: "center", py: 3 }}>
      <Typography
        variant="body1"
        paragraph
        color="text.secondary"
        sx={{ mb: 4 }}
      >
        Inicia sesión para ver los objetos reportados y encontrar el tuyo. Te
        notificaremos cuando aparezca algo similar.
      </Typography>

      <Button
        variant="contained"
        color="secondary"
        startIcon={<GoogleIcon />}
        size="large"
        onClick={handleLogin}
      >
        Iniciar sesión con Google
      </Button>
    </Box>
  );
}
