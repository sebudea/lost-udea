import { useMediaQuery } from "@mui/material";
import { useState, useCallback, useEffect } from "react";

type ColorMode = "light" | "dark";

interface UseThemeReturn {
  isDarkMode: boolean;
  toggleColorMode: () => void;
  mode: ColorMode;
}

export const useTheme = (): UseThemeReturn => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const savedMode = localStorage.getItem("colorMode");
    return savedMode ? savedMode === "dark" : prefersDarkMode;
  });

  const toggleColorMode = useCallback(() => {
    setIsDarkMode((prev) => {
      const newMode = !prev;
      localStorage.setItem("colorMode", newMode ? "dark" : "light");
      return newMode;
    });
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem("colorMode")) {
        setIsDarkMode(e.matches);
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return {
    isDarkMode,
    toggleColorMode,
    mode: isDarkMode ? "dark" : "light",
  };
}; 