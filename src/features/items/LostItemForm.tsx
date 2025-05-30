import { Box, Button, Typography } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";

export function LostItemForm() {
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
      >
        Iniciar sesión con Google
      </Button>
    </Box>
  );
}
