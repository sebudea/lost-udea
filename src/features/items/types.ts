import type { Location } from "../../constants/locations";
import type { ItemType } from "../../constants/itemTypes";

export interface FormValues {
  itemType: string;
  location: Location | "";
  date: Date;
  image: File | null;
}

export interface FoundItem {
  id: string;
  type: string;
  location: string;
  foundDate: Date;
  description: string;
  image: string;
  status: "pending" | "delivered" | "matched";
  finderId: string;
}

export interface LostItem {
  id: string;
  type: string;
  locations: string[];
  lostDate: Date;
  description: string;
  imageUrl?: string;
  status: "searching" | "found" | "closed";
  seekerId: string;
} 