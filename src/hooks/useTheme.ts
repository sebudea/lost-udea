import { useMediaQuery } from "@mui/material";
import { useState, useCallback } from "react";

export function useTheme() {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [isDarkMode, setIsDarkMode] = useState(prefersDarkMode);

  const toggleColorMode = useCallback(() => {
    setIsDarkMode((prev) => !prev);
  }, []);

  return {
    isDarkMode,
    toggleColorMode,
  };
} 