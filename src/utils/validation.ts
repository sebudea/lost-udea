import * as yup from "yup";
import dayjs from "dayjs";

export const validationSchema = yup.object({
  itemType: yup.string().required("Por favor selecciona qué encontraste"),
  location: yup.string().required("Por favor selecciona dónde lo encontraste").min(1),
  date: yup
    .date()
    .required("Por favor selecciona cuándo lo encontraste")
    .max(dayjs().endOf('day').toDate(), "La fecha no puede ser futura")
    .nullable()
    .transform((curr, orig) => (orig === '' ? null : curr)),
  image: yup.mixed().required("Por favor sube o toma una foto del objeto"),
}); 