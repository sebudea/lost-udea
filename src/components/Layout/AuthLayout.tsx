import { Box } from "@mui/material";
import { Header } from "../Header/Header";
import { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
  isDarkMode: boolean;
  onToggleTheme: () => void;
}

export const AuthLayout = ({
  children,
  isDarkMode,
  onToggleTheme,
}: AuthLayoutProps) => {
  return (
    <Box
      component="div"
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        bgcolor: "background.default",
      }}
    >
      <Header isDarkMode={isDarkMode} onToggleTheme={onToggleTheme} />
      <Box
        component="main"
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          width: "100%",
          mt: 8,
          pt: { xs: 2, sm: 3 },
          pb: { xs: 4, sm: 5 },
        }}
      >
        {children}
      </Box>
    </Box>
  );
};
