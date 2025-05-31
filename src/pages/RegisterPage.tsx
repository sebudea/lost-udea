import { Box, Container, IconButton, Paper, Typography } from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { RegisterForm } from "../features/auth/RegisterForm";

interface RegisterPageProps {
  isDarkMode: boolean;
  onToggleTheme: () => void;
}

export function RegisterPage({ isDarkMode, onToggleTheme }: RegisterPageProps) {
  return (
    <>
      <IconButton
        onClick={onToggleTheme}
        color="inherit"
        sx={{
          position: "fixed",
          right: 16,
          top: 16,
          bgcolor: "background.paper",
          boxShadow: 1,
          "&:hover": {
            bgcolor: "background.paper",
          },
        }}
      >
        {isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>
      <Container
        maxWidth="sm"
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 4,
            width: "100%",
            py: 4,
          }}
        >
          <Typography variant="h4" component="h1" align="center" gutterBottom>
            Registro
          </Typography>

          <Paper elevation={2} sx={{ p: 4, borderRadius: 3 }}>
            <RegisterForm />
          </Paper>
        </Box>
      </Container>
    </>
  );
}
