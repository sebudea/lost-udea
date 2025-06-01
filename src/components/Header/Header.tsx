import { Box, Container, IconButton, Typography } from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  isDarkMode: boolean;
  onToggleTheme: () => void;
}

export function Header({ isDarkMode, onToggleTheme }: HeaderProps) {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Aquí irá la lógica de logout con Firebase
    console.log("Cerrando sesión...");
    navigate("/");
  };

  return (
    <Box
      component="header"
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        py: 2,
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="h6"
          component="h1"
          color="primary"
          sx={{
            fontWeight: 700,
            bgcolor: "background.default",
            px: 3,
            py: 1,
            borderRadius: 2,
          }}
        >
          Lost UdeA
        </Typography>
      </Container>
      <IconButton
        onClick={() => navigate("/profile")}
        color="inherit"
        sx={{
          position: "fixed",
          left: 16,
          top: 16,
          bgcolor: "background.paper",
          boxShadow: 1,
          "&:hover": {
            bgcolor: "background.paper",
          },
        }}
      >
        <AccountCircleIcon />
      </IconButton>
      <Box
        sx={{
          position: "fixed",
          right: 16,
          top: 16,
          display: "flex",
          gap: 1,
        }}
      >
        <IconButton
          onClick={handleLogout}
          color="inherit"
          sx={{
            bgcolor: "background.paper",
            boxShadow: 1,
            "&:hover": {
              bgcolor: "background.paper",
            },
          }}
        >
          <LogoutIcon />
        </IconButton>
        <IconButton
          onClick={onToggleTheme}
          color="inherit"
          sx={{
            bgcolor: "background.paper",
            boxShadow: 1,
            "&:hover": {
              bgcolor: "background.paper",
            },
          }}
        >
          {isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
      </Box>
    </Box>
  );
}
