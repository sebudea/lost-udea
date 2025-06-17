import { Box, ThemeProvider, useMediaQuery, CssBaseline } from "@mui/material";
import { getTheme } from "./styles/theme";
import { useState, useMemo, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { RegisterPage } from "./pages/RegisterPage";
import { HomePage } from "./pages/HomePage";
import { LandingPage } from "./pages/LandingPage";
import { ProfilePage } from "./pages/ProfilePage";
import { ReportPage } from "./pages/ReportPage";
import { SearchResultsPage } from "./pages/SearchResultsPage";
import { MyLostItemsPage } from "./pages/MyLostItemsPage";
import { MatchesPage } from "./pages/MatchesPage";
import { FoundLocationPage } from "./pages/FoundLocationPage";
import { FoundMatchesPage } from "./pages/FoundMatchesPage";
import { ThankYouPage } from "./pages/ThankYouPage";
import { AuthProvider } from "./context/AuthContext";
import { useUserStore } from "./stores/userStore";

function App() {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [mode, setMode] = useState<"light" | "dark">(
    prefersDarkMode ? "dark" : "light"
  );
  const initialize = useUserStore((state) => state.initialize);

  useEffect(() => {
    initialize();
  }, [initialize]);

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
      <AuthProvider>
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
              <Route
                path="/profile"
                element={<ProfilePage {...themeProps} />}
              />
              <Route path="/report" element={<ReportPage {...themeProps} />} />
              <Route
                path="/search-results"
                element={<SearchResultsPage {...themeProps} />}
              />
              <Route
                path="/my-lost-items"
                element={<MyLostItemsPage {...themeProps} />}
              />
              <Route
                path="/matches/:itemId"
                element={<MatchesPage {...themeProps} />}
              />
              <Route
                path="/found-location/:itemId"
                element={<FoundLocationPage {...themeProps} />}
              />
              <Route
                path="/found-matches/:itemId"
                element={<FoundMatchesPage {...themeProps} />}
              />
              <Route
                path="/thank-you/:itemId"
                element={<ThankYouPage {...themeProps} />}
              />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </BrowserRouter>
        </Box>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
