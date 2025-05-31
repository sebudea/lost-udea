import { Box, ThemeProvider, useMediaQuery, CssBaseline } from "@mui/material";
import { getTheme } from "./styles/theme";
import { useState, useMemo } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { RegisterPage } from "./pages/RegisterPage";
import { HomePage } from "./pages/HomePage";
import { LandingPage } from "./pages/LandingPage";
import { ProfilePage } from "./pages/ProfilePage";
import { ReportPage } from "./pages/ReportPage";
import { SearchResultsPage } from "./pages/SearchResultsPage";

function App() {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [mode, setMode] = useState<"light" | "dark">(
    prefersDarkMode ? "dark" : "light"
  );

  const theme = useMemo(() => getTheme(mode), [mode]);

  const toggleColorMode = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  const themeProps = {
    isDarkMode: mode === "dark",
    onToggleTheme: toggleColorMode,
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          bgcolor: "background.default",
          minHeight: "100vh",
          overflow: "hidden",
        }}
      >
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage {...themeProps} />} />
            <Route
              path="/register"
              element={<RegisterPage {...themeProps} />}
            />
            <Route path="/home" element={<HomePage {...themeProps} />} />
            <Route path="/profile" element={<ProfilePage {...themeProps} />} />
            <Route path="/report" element={<ReportPage {...themeProps} />} />
            <Route
              path="/search-results"
              element={<SearchResultsPage {...themeProps} />}
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </Box>
    </ThemeProvider>
  );
}

export default App;
