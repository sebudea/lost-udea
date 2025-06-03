import {
  Box,
  Container,
  IconButton,
  Typography,
  AppBar,
  Toolbar,
  Tooltip,
} from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  isDarkMode: boolean;
  onToggleTheme: () => void;
}

export const Header = ({ isDarkMode, onToggleTheme }: HeaderProps) => {
  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate("/profile");
  };

  const handleLogout = () => {
    // TODO: Implement logout logic
    navigate("/");
  };

  const buttonStyles = {
    bgcolor: "background.paper",
    boxShadow: 1,
    "&:hover": {
      bgcolor: "background.paper",
    },
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
        bgcolor: "transparent",
        zIndex: (theme) => theme.zIndex.appBar,
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

        <IconButton
          onClick={handleProfileClick}
          color="inherit"
          aria-label="Ir al perfil"
          sx={{
            position: "fixed",
            left: 16,
            top: 16,
            ...buttonStyles,
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
          <Tooltip title="Cerrar sesión">
            <IconButton
              onClick={handleLogout}
              color="inherit"
              aria-label="Cerrar sesión"
              sx={buttonStyles}
            >
              <LogoutIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title={`Cambiar a modo ${isDarkMode ? "claro" : "oscuro"}`}>
            <IconButton
              onClick={onToggleTheme}
              color="inherit"
              aria-label={`Cambiar a modo ${isDarkMode ? "claro" : "oscuro"}`}
              sx={buttonStyles}
            >
              {isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
          </Tooltip>
        </Box>
      </Container>
    </Box>
  );
};
