import {
  Container,
  Typography,
  Paper,
  Box,
  Grid,
  Card,
  CardContent,
  Tabs,
  Tab,
} from "@mui/material";
import { AuthLayout } from "../components/Layout/AuthLayout";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../stores/userStore";
import { useItemsStore } from "../stores/itemsStore";
import { TabPanel } from "../components/TabPanel/TabPanel";

interface AdminDashboardPageProps {
  isDarkMode: boolean;
  onToggleTheme: () => void;
}

export const AdminDashboardPage = ({
  isDarkMode,
  onToggleTheme,
}: AdminDashboardPageProps) => {
  const [tabValue, setTabValue] = useState(0);
  const navigate = useNavigate();
  const { currentUser, isLoading: userLoading } = useUserStore();
  const {
    lostItems,
    foundItems,
    matches,
    initialize,
    isLoading: itemsLoading,
  } = useItemsStore();

  // Inicializar la suscripción a Firestore
  useEffect(() => {
    const unsubscribe = initialize();
    return () => unsubscribe();
  }, [initialize]);

  // Redirigir si no es admin
  useEffect(() => {
    if (!userLoading && (!currentUser || !currentUser.isAdmin())) {
      navigate("/");
    }
  }, [userLoading, currentUser, navigate]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  if (userLoading || itemsLoading) {
    return <div>Cargando...</div>;
  }

  if (!currentUser?.isAdmin()) {
    return null;
  }

  return (
    <AuthLayout isDarkMode={isDarkMode} onToggleTheme={onToggleTheme}>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Dashboard Administrativo
        </Typography>

        {/* Resumen de Estadísticas */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Objetos Perdidos
                </Typography>
                <Typography variant="h5">{lostItems.length}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Objetos Encontrados
                </Typography>
                <Typography variant="h5">{foundItems.length}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Coincidencias
                </Typography>
                <Typography variant="h5">{matches.length}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Tasa de Éxito
                </Typography>
                <Typography variant="h5">
                  {lostItems.length > 0
                    ? `${Math.round(
                        (matches.length / lostItems.length) * 100
                      )}%`
                    : "0%"}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Tabs para diferentes secciones */}
        <Paper sx={{ width: "100%", mb: 2 }}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
          >
            <Tab label="Objetos" />
            <Tab label="Usuarios" />
            <Tab label="Reportes" />
          </Tabs>

          <TabPanel value={tabValue} index={0}>
            <Typography variant="h6">Lista de Objetos</Typography>
            {/* Aquí irá la lista de objetos */}
          </TabPanel>

          <TabPanel value={tabValue} index={1}>
            <Typography variant="h6">Lista de Usuarios</Typography>
            {/* Aquí irá la lista de usuarios */}
          </TabPanel>

          <TabPanel value={tabValue} index={2}>
            <Typography variant="h6">Reportes</Typography>
            {/* Aquí irán los reportes */}
          </TabPanel>
        </Paper>
      </Container>
    </AuthLayout>
  );
};
