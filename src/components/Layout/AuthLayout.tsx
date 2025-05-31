import { Box } from "@mui/material";
import { Header } from "../Header/Header";
import { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
  isDarkMode: boolean;
  onToggleTheme: () => void;
}

export function AuthLayout({
  children,
  isDarkMode,
  onToggleTheme,
}: AuthLayoutProps) {
  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Header isDarkMode={isDarkMode} onToggleTheme={onToggleTheme} />
      <Box
        component="main"
        sx={{
          flex: 1,
          pt: 8,
          overflow: "auto",
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
