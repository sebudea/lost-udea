import { Box, TextField, Button, Typography } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";

interface RegisterFormValues {
  fullName: string;
  phoneNumber: string;
  idNumber: string;
}

const validationSchema = yup.object({
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

export function RegisterForm() {
  const navigate = useNavigate();

  const formik = useFormik<RegisterFormValues>({
    initialValues: {
      fullName: "",
      phoneNumber: "",
      idNumber: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
      // Aquí iría la lógica para guardar el usuario
      navigate("/home");
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
          >
            Completar registro
          </Button>
        </Box>
      </form>
    </>
  );
}
