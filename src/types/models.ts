import { ItemType, Location, FoundItemStatus, LostItemStatus, MatchStatus } from './enums';
import { ItemTypeData } from './itemType';

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

// Interface base para FoundItem
export interface IFoundItem {
  id: string;
  type: ItemTypeData;
  location: Location;
  foundDate: Date;
  image: string;
  status: FoundItemStatus;
  finderId: string;
}

// Clase FoundItem que implementa la interfaz
export class FoundItem implements IFoundItem {
  id: string;
  type: ItemTypeData;
  location: Location;
  foundDate: Date;
  image: string;
  status: FoundItemStatus;
  finderId: string;

  constructor(data: Partial<IFoundItem>) {
    this.id = data.id || '';
    this.type = data.type || { value: ItemType.OTHER, label: 'Otro' };
    this.location = data.location || Location.OTRO;
    this.foundDate = data.foundDate || new Date();
    this.image = data.image || '';
    this.status = data.status || FoundItemStatus.PENDING;
    this.finderId = data.finderId || '';
  }

  // Método para convertir a un objeto plano para Firestore
  toFirestore() {
    return {
      type: this.type,
      location: this.location,
      foundDate: this.foundDate.toISOString(),
      image: this.image,
      status: this.status,
      finderId: this.finderId,
    };
  }

  // Método estático para crear una instancia desde un documento Firestore
  static fromFirestore(id: string, data: any): FoundItem {
    return new FoundItem({
      id,
      type: data.type,
      location: data.location,
      foundDate: new Date(data.foundDate),
      image: data.image,
      status: data.status,
      finderId: data.finderId,
    });
  }
}

// Interface base para LostItem
export interface ILostItem {
  id: string;
  type: ItemTypeData;
  locations: Location[];
  lostDate: Date;
  description: string;
  imageUrl?: string;
  status: LostItemStatus;
  seekerId: string;
}

// Clase LostItem que implementa la interfaz
export class LostItem implements ILostItem {
  id: string;
  type: ItemTypeData;
  locations: Location[];
  lostDate: Date;
  description: string;
  imageUrl?: string;
  status: LostItemStatus;
  seekerId: string;

  constructor(data: Partial<ILostItem>) {
    this.id = data.id || '';
    this.type = data.type || { value: ItemType.OTHER, label: 'Otro' };
    this.locations = data.locations || [];
    this.lostDate = data.lostDate || new Date();
    this.description = data.description || '';
    this.imageUrl = data.imageUrl;
    this.status = data.status !== undefined ? data.status : LostItemStatus.SEARCHING;
    this.seekerId = data.seekerId || '';
  }

  // Método para convertir a un objeto plano para Firestore
  toFirestore() {
    return {
      type: this.type,
      locations: this.locations,
      lostDate: this.lostDate.toISOString(),
      description: this.description,
      ...(this.imageUrl && { imageUrl: this.imageUrl }),
      status: this.status,
      seekerId: this.seekerId,
    };
  }

  // Método estático para crear una instancia desde un documento Firestore
  static fromFirestore(id: string, data: any): LostItem {
    return new LostItem({
      id,
      type: data.type,
      locations: data.locations,
      lostDate: new Date(data.lostDate),
      description: data.description,
      imageUrl: data.imageUrl,
      status: data.status,
      seekerId: data.seekerId,
    });
  }
}

// Interface base para Match
export interface IMatch {
  id: string;
  lostItemId: string;
  foundItemId: string;
  status: MatchStatus;
  matchDate: Date;
}

// Clase Match que implementa la interfaz
export class Match implements IMatch {
  id: string;
  lostItemId: string;
  foundItemId: string;
  status: MatchStatus;
  matchDate: Date;

  constructor(data: Partial<IMatch>) {
    this.id = data.id || '';
    this.lostItemId = data.lostItemId || '';
    this.foundItemId = data.foundItemId || '';
    this.status = data.status || MatchStatus.PENDING;
    this.matchDate = data.matchDate || new Date();
  }

  // Método para convertir a un objeto plano para Firestore
  toFirestore() {
    return {
      lostItemId: this.lostItemId,
      foundItemId: this.foundItemId,
      status: this.status,
      matchDate: this.matchDate.toISOString(),
    };
  }

  // Método estático para crear una instancia desde un documento Firestore
  static fromFirestore(id: string, data: any): Match {
    return new Match({
      id,
      lostItemId: data.lostItemId,
      foundItemId: data.foundItemId,
      status: data.status,
      matchDate: new Date(data.matchDate),
    });
  }
}

// Tipos auxiliares para formularios
export interface UserFormData extends Omit<IUser, 'id' | 'createdAt'> {}

export interface FoundItemFormData extends Omit<IFoundItem, 'id' | 'status' | 'finderId'> {}

export interface LostItemFormData extends Omit<ILostItem, 'id' | 'status' | 'seekerId'> {}