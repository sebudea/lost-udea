import {
  Alert,
  Box,
  Container,
  IconButton,
  Paper,
  Snackbar,
  Tab,
  Tabs,
  Typography,
  AlertTitle,
  Button,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CategoryIcon from "@mui/icons-material/Category";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useState } from "react";
import { TabPanel } from "../components/TabPanel/TabPanel";
import { FoundItemForm } from "../features/items/FoundItemForm";
import { LoginForm } from "../features/auth/LoginForm";
import { deliveryPoints, DEFAULT_DELIVERY_POINT } from "../data/deliveryPoints";

interface LandingPageProps {
  isDarkMode: boolean;
  onToggleTheme: () => void;
}

interface SuccessInfo {
  show: boolean;
  location?: string;
}

export function LandingPage({ isDarkMode, onToggleTheme }: LandingPageProps) {
  const [tabValue, setTabValue] = useState(0);
  const [successInfo, setSuccessInfo] = useState<SuccessInfo>({ show: false });

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleFoundItemSuccess = (location: string) => {
    setSuccessInfo({ show: true, location });
  };

  const handleCloseSnackbar = () => {
    setSuccessInfo({ show: false });
  };

  const getDeliveryLocation = (location: string) => {
    return deliveryPoints[location] || DEFAULT_DELIVERY_POINT;
  };

  return (
    <>
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
      <Container
        maxWidth="sm"
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 4,
            width: "100%",
            py: 4,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
            }}
          >
            <Typography
              variant="h2"
              align="center"
              color="primary"
              sx={{ fontWeight: 700 }}
            >
              Lost UdeA
            </Typography>
            <Typography
              variant="subtitle1"
              align="center"
              color="text.secondary"
              sx={{ maxWidth: 600 }}
            >
              Sistema de objetos perdidos y encontrados de la Universidad de
              Antioquia
            </Typography>
          </Box>

          <Paper elevation={2} sx={{ borderRadius: 3, overflow: "hidden" }}>
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              variant="fullWidth"
              sx={{ borderBottom: 1, borderColor: "divider" }}
            >
              <Tab
                icon={<CategoryIcon />}
                label="Encontré un objeto"
                sx={{
                  textTransform: "none",
                  fontSize: "1.1rem",
                  py: 2,
                }}
              />
              <Tab
                icon={<SearchIcon />}
                label="Perdí un objeto"
                sx={{
                  textTransform: "none",
                  fontSize: "1.1rem",
                  py: 2,
                }}
              />
            </Tabs>

            <TabPanel value={tabValue} index={0}>
              <FoundItemForm onSuccess={handleFoundItemSuccess} />
            </TabPanel>

            <TabPanel value={tabValue} index={1}>
              <LoginForm />
            </TabPanel>
          </Paper>
        </Box>
      </Container>

      <Snackbar
        open={successInfo.show}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        sx={{
          maxWidth: "600px",
          width: "100%",
          mb: 2,
        }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          variant="filled"
          sx={{
            width: "100%",
            "& .MuiAlert-action": {
              alignItems: "center",
              paddingTop: 0,
            },
          }}
          action={
            <Button color="inherit" size="small" onClick={handleCloseSnackbar}>
              Cerrar
            </Button>
          }
        >
          <AlertTitle>¡Gracias por reportar el objeto!</AlertTitle>
          Por favor, entrega el objeto en{" "}
          {getDeliveryLocation(successInfo.location || "")}. Tu ayuda es muy
          valiosa para la comunidad universitaria.
        </Alert>
      </Snackbar>
    </>
  );
}
