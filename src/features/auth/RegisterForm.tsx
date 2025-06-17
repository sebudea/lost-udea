import {
  Box,
  TextField,
  Button,
  Typography,
  CircularProgress,
} from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import { db } from "../../config/firebase";
import { doc, setDoc } from "firebase/firestore";
import { useState } from "react";
import { User } from "../../types/models";

const validationSchema = yup.object({
  email: yup
    .string()
    .email("Ingresa un email válido")
    .required("El email es requerido")
    .matches(/@udea\.edu\.co$/, "Debe ser un correo de la UdeA"),
  fullName: yup.string().required("Por favor ingresa tu nombre completo"),
  phoneNumber: yup
    .string()
    .required("Por favor ingresa tu número de teléfono")
    .matches(/^\d{10}$/, "El número debe tener 10 dígitos"),
  idNumber: yup
    .string()
    .required("Por favor ingresa tu número de identificación")
    .matches(/^\d{8,10}$/, "El número debe tener entre 8 y 10 dígitos"),
});

export const RegisterForm = () => {
  const navigate = useNavigate();
  const { user: authUser } = useAuthContext();
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: authUser?.email || "",
      fullName: authUser?.displayName || "",
      phoneNumber: "",
      idNumber: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        setLoading(true);
        if (!authUser) {
          throw new Error("No hay usuario autenticado");
        }

        // Crear una instancia de User con los datos del formulario
        const user = new User({
          id: authUser.uid,
          email: values.email,
          fullName: values.fullName,
          phoneNumber: values.phoneNumber,
          idNumber: values.idNumber,
          createdAt: new Date(),
        });

        // Guardar en Firestore usando el método toFirestore
        await setDoc(doc(db, "users", authUser.uid), user.toFirestore());

        navigate("/home");
      } catch (error) {
        console.error("Error registering user:", error);
        // Aquí podrías mostrar un mensaje de error al usuario
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <>
      <Typography variant="h5" component="h2" gutterBottom align="center">
        Completa tu registro
      </Typography>
      <Typography
        variant="body1"
        color="text.secondary"
        paragraph
        align="center"
      >
        Para poder reportar objetos perdidos, necesitamos algunos datos
        adicionales.
      </Typography>

      <form onSubmit={formik.handleSubmit}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3, mt: 3 }}>
          <TextField
            fullWidth
            id="email"
            name="email"
            label="Correo electrónico"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            disabled={Boolean(authUser?.email)}
          />

          <TextField
            fullWidth
            id="fullName"
            name="fullName"
            label="Nombre completo"
            value={formik.values.fullName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.fullName && Boolean(formik.errors.fullName)}
            helperText={formik.touched.fullName && formik.errors.fullName}
          />

          <TextField
            fullWidth
            id="phoneNumber"
            name="phoneNumber"
            label="Número de teléfono"
            value={formik.values.phoneNumber}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)
            }
            helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
          />

          <TextField
            fullWidth
            id="idNumber"
            name="idNumber"
            label="Número de identificación"
            value={formik.values.idNumber}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.idNumber && Boolean(formik.errors.idNumber)}
            helperText={formik.touched.idNumber && formik.errors.idNumber}
          />

          <Button
            type="submit"
            variant="contained"
            size="large"
            fullWidth
            sx={{ mt: 2 }}
            disabled={loading}
          >
            {loading ? (
              <>
                <CircularProgress size={24} color="inherit" sx={{ mr: 1 }} />
                Registrando...
              </>
            ) : (
              "Completar registro"
            )}
          </Button>
        </Box>
      </form>
    </>
  );
};
