export type ItemType =
  | "electronics"
  | "documents"
  | "clothing"
  | "accessories"
  | "other";

export type Location =
  | "Bloque 1 - Fac. Ciencias Exactas y Naturales"
  | "Bloque 2 - Fac. Ciencias Exactas y Naturales"
  | "Bloque 3 - Fac. Ciencias Farmacéuticas y Alimentarias"
  | "Bloque 4 - Fac. Ciencias Exactas y Naturales: Depto. de Matemáticas"
  | "Bloque 5 - Esc. Microbiología"
  | "Bloque 6 - Fac. Ciencias Exactas y Naturales: Inst. de Física"
  | "Bloque 7 - Fac. Ciencias Exactas y Naturales: Inst. de Biología"
  | "Bloque 8 - Biblioteca Central"
  | "Bloque 9 - Fac. de Educación"
  | "Bloque 10 - Auditorios"
  | "Bloque 11 - Aulas especiales"
  | "Bloque 12 - Esc. de Idiomas"
  | "Bloque 13 - Fac. de Comunicaciones y Filología"
  | "Bloque 14 - Fac. Ciencias Económicas"
  | "Bloque 15 - Museo Universitario MUUA"
  | "Bloque 16 - Bloque Administrativo"
  | "Bloque 17 - Capilla Universitaria"
  | "Bloque 18 - Fac. de Ingeniería (laboratorios)"
  | "Bloque 19 - Fac. de Ingeniería"
  | "Bloque 20 - Fac. de Ingeniería"
  | "Bloque 21 - Fac. de Ingeniería"
  | "Bloque 22 - Bienestar Universitario"
  | "Bloque 23 - Teatro Universitario Camilo Torres"
  | "Bloque 24 - Fac. de Artes"
  | "Bloque 25 - Fac. de Artes"
  | "Bloque 26 - Museo de Artes Visuales"
  | "Bloque 27 - Depto. Comercial"
  | "Bloque 28 - Depto. Documentación"
  | "Bloque 29 - Depto. de Sostenimiento"
  | "Otro";

export type FoundItemStatus = "pending" | "delivered" | "matched";
export type LostItemStatus = "searching" | "found" | "closed";
export type MatchStatus = "pending" | "verified" | "completed";