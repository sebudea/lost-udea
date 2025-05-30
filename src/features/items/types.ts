import type { Location } from "../../constants/locations";
import type { ItemType } from "../../constants/itemTypes";

export interface FormValues {
  itemType: string;
  location: Location | "";
  date: Date;
  image: File | null;
} 