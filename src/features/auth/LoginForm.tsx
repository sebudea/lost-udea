import {
  Box,
  Button,
  Typography,
  CircularProgress,
  Alert,
  Snackbar,
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import { useState } from "react";
import { db } from "../../config/firebase";
import { doc, getDoc } from "firebase/firestore";
import { User } from "../../types/models";

export const LoginForm = () => {
  const navigate = useNavigate();
  const { signInWithGoogle } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const checkUserExists = async (userId: string): Promise<User | null> => {
    try {
      const userRef = doc(db, "users", userId);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        return User.fromFirestore(userId, userSnap.data());
      }
      return null;
    } catch (error) {
      console.error("Error checking user:", error);
      return null;
    }
  };

  const handleLogin = async () => {
    try {
      setLoading(true);
      setError(null);
      const authUser = await signInWithGoogle();

      if (authUser) {
        // Verificar si el usuario ya existe en la base de datos
        const user = await checkUserExists(authUser.uid);

        if (user) {
          // Si el usuario ya existe, verificamos si es seeker o finder
          if (user.isSeeker()) {
            // Si es seeker (tiene todos los datos), va al home
            navigate("/home");
          } else {
            // Si es finder (datos básicos), va a completar registro
            navigate("/register");
          }
        } else {
          // Si es nuevo usuario, redirigir al registro
          navigate("/register");
        }
      }
    } catch (error) {
      console.error("Error during login:", error);
      setError("Error al iniciar sesión. Por favor, intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  const handleCloseError = () => {
    setError(null);
  };

  return (
    <Box sx={{ textAlign: "center", py: 3 }}>
      <Typography
        variant="body1"
        paragraph
        color="text.secondary"
        sx={{ mb: 4 }}
      >
        Inicia sesión para ver los objetos reportados y encontrar el tuyo. Te
        notificaremos cuando aparezca algo similar.
      </Typography>

      <Button
        variant="contained"
        color="secondary"
        startIcon={
          loading ? (
            <CircularProgress size={20} color="inherit" />
          ) : (
            <GoogleIcon />
          )
        }
        size="large"
        onClick={handleLogin}
        disabled={loading}
      >
        {loading ? "Iniciando sesión..." : "Iniciar sesión con Google"}
      </Button>

      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={handleCloseError}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseError}
          severity="error"
          sx={{ width: "100%" }}
        >
          {error}
        </Alert>
      </Snackbar>
    </Box>
  );
};
