import { ItemType, Location, FoundItemStatus, LostItemStatus, MatchStatus } from './enums';

// Interface base para el usuario
export interface IUser {
  id: string;
  email: string;
  fullName: string;
  createdAt: Date;
  phoneNumber?: string;
  idNumber?: string;
}

// Clase User que implementa la interfaz
export class User implements IUser {
  id: string;
  email: string;
  fullName: string;
  createdAt: Date;
  phoneNumber?: string;
  idNumber?: string;

  constructor(data: Partial<IUser>) {
    this.id = data.id || '';
    this.email = data.email || '';
    this.fullName = data.fullName || '';
    this.createdAt = data.createdAt || new Date();
    this.phoneNumber = data.phoneNumber;
    this.idNumber = data.idNumber;
  }

  // Método para convertir a un objeto plano para Firestore
  toFirestore() {
    return {
      email: this.email,
      fullName: this.fullName,
      createdAt: this.createdAt.toISOString(),
      ...(this.phoneNumber && { phoneNumber: this.phoneNumber }),
      ...(this.idNumber && { idNumber: this.idNumber })
    };
  }

  // Método estático para crear una instancia desde un documento Firestore
  static fromFirestore(id: string, data: any): User {
    return new User({
      id,
      email: data.email,
      fullName: data.fullName,
      createdAt: new Date(data.createdAt),
      phoneNumber: data.phoneNumber,
      idNumber: data.idNumber
    });
  }

  // Método para verificar si el usuario es un seeker (tiene datos completos)
  isSeeker(): boolean {
    return !!(this.phoneNumber && this.idNumber);
  }

  // Método para verificar si el usuario es un finder (solo datos básicos)
  isFinder(): boolean {
    return !this.isSeeker();
  }
}

export interface FoundItem {
  id: string;
  type: ItemType;
  location: Location;
  foundDate: Date;
  image: string;
  status: FoundItemStatus;
  finderId: string;
}

export interface LostItem {
  id: string;
  type: ItemType;
  locations: Location[];
  lostDate: Date;
  description: string;
  imageUrl?: string;
  status: LostItemStatus;
  seekerId: string;
}

export interface Match {
  id: string;
  lostItemId: string;
  foundItemId: string;
  status: MatchStatus;
  matchDate: Date;
}

// Tipos auxiliares para formularios
export interface UserFormData extends Omit<IUser, 'id' | 'createdAt'> {}

export interface FoundItemFormData extends Omit<FoundItem, 'id' | 'status' | 'finderId'> {}

export interface LostItemFormData extends Omit<LostItem, 'id' | 'status' | 'seekerId'> {}