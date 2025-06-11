export enum Location {
  BLOQUE_1 = "Bloque 1 - Fac. Ciencias Exactas y Naturales",
  BLOQUE_2 = "Bloque 2 - Fac. Ciencias Exactas y Naturales",
  BLOQUE_3 = "Bloque 3 - Fac. Ciencias Farmacéuticas y Alimentarias",
  BLOQUE_4 = "Bloque 4 - Fac. Ciencias Exactas y Naturales: Depto. de Matemáticas",
  BLOQUE_5 = "Bloque 5 - Esc. Microbiología",
  BLOQUE_6 = "Bloque 6 - Fac. Ciencias Exactas y Naturales: Inst. de Física",
  BLOQUE_7 = "Bloque 7 - Fac. Ciencias Exactas y Naturales: Inst. de Biología",
  BLOQUE_8 = "Bloque 8 - Biblioteca Central",
  BLOQUE_9 = "Bloque 9 - Fac. de Educación",
  BLOQUE_10 = "Bloque 10 - Auditorios",
  BLOQUE_11 = "Bloque 11 - Aulas especiales",
  BLOQUE_12 = "Bloque 12 - Esc. de Idiomas",
  BLOQUE_13 = "Bloque 13 - Fac. de Comunicaciones y Filología",
  BLOQUE_14 = "Bloque 14 - Fac. Ciencias Económicas",
  BLOQUE_15 = "Bloque 15 - Museo Universitario MUUA",
  BLOQUE_16 = "Bloque 16 - Bloque Administrativo",
  BLOQUE_17 = "Bloque 17 - Capilla Universitaria",
  BLOQUE_18 = "Bloque 18 - Fac. de Ingeniería (laboratorios)",
  BLOQUE_19 = "Bloque 19 - Fac. de Ingeniería",
  BLOQUE_20 = "Bloque 20 - Fac. de Ingeniería",
  BLOQUE_21 = "Bloque 21 - Fac. de Ingeniería",
  BLOQUE_22 = "Bloque 22 - Bienestar Universitario",
  BLOQUE_23 = "Bloque 23 - Teatro Universitario Camilo Torres",
  BLOQUE_24 = "Bloque 24 - Fac. de Artes",
  BLOQUE_25 = "Bloque 25 - Fac. de Artes",
  BLOQUE_26 = "Bloque 26 - Museo de Artes Visuales",
  BLOQUE_27 = "Bloque 27 - Depto. Comercial",
  BLOQUE_28 = "Bloque 28 - Depto. Documentación",
  BLOQUE_29 = "Bloque 29 - Depto. de Sostenimiento",
  OTRO = "Otro"
}

export interface ItemType {
  value: string;
  label: string;
}

export type FoundItemStatus = "pending" | "delivered" | "matched";
export type LostItemStatus = "pending" | "found" | "matched" | "desisted";
export type MatchStatus = "pending" | "verified" | "completed";