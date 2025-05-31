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
    <Box sx={{ height: "100vh", overflow: "hidden" }}>
      <Header isDarkMode={isDarkMode} onToggleTheme={onToggleTheme} />
      <Box
        component="main"
        sx={{
          height: "calc(100vh - 64px)", // Subtract header height
          pt: 8,
          overflow: "hidden",
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
