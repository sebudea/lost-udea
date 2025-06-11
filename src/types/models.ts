import { ItemType, Location, FoundItemStatus, LostItemStatus, MatchStatus } from './enums';

export interface User {
  id: string;
  email: string;
  fullName: string;
  createdAt?: Date; // si es un finder no se le pone createdAt, cuando ya es un seeker se le pone el createdAt
  phoneNumber?: string; // Requerido solo para seekers
  idNumber?: string; // Cédula, requerido solo para seekers
}

export interface FoundItem {
  id: string;
  type: ItemType;
  location: Location;
  foundDate: Date;
  // description: string; // Descripción generada por IA, por ahora no lo usaremos
  image: string;
  status: FoundItemStatus;
  finderId: string; // ID del usuario que lo encontró
}

export interface LostItem {
  id: string;
  type: ItemType;
  locations: Location[]; // Array de posibles lugares (máximo 2)
  lostDate: Date;
  description: string; // Descripción proporcionada por el usuario
  imageUrl?: string; // URL de la imagen (opcional)
  status: LostItemStatus;
  seekerId: string; // ID del usuario que lo perdió
}

export interface Match {
  id: string;
  lostItemId: string; // ID del objeto perdido
  foundItemId: string; // ID del objeto encontrado
  status: MatchStatus;
  matchDate: Date; // Fecha cuando se hizo el match
}

// Tipos auxiliares para el manejo de formularios y validaciones
export type UserRole = "finder" | "seeker";

export interface UserFormData extends Omit<User, 'id' | 'createdAt'> {
  role: UserRole;
}

export interface FoundItemFormData extends Omit<FoundItem, 'id' | 'status' | 'finderId'> {}

export interface LostItemFormData extends Omit<LostItem, 'id' | 'status' | 'seekerId'> {}