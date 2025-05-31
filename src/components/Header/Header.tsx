import { Box, Container, IconButton, Typography } from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

interface HeaderProps {
  isDarkMode: boolean;
  onToggleTheme: () => void;
}

export function Header({ isDarkMode, onToggleTheme }: HeaderProps) {
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
          }}
        >
          Lost UdeA
        </Typography>
      </Container>
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
    </Box>
  );
}
