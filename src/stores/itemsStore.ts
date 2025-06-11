import { create } from 'zustand';
import { LostItem, FoundItem, Match } from '../types/models';
import { ItemType, Location } from '../types/enums';

interface ItemsState {
  lostItems: LostItem[];
  foundItems: FoundItem[];
  matches: Match[];
  // Actions para Lost Items
  addLostItem: (item: Omit<LostItem, 'id' | 'status'>) => void;
  updateLostItem: (id: string, item: Partial<LostItem>) => void;
  deleteLostItem: (id: string) => void;
  getLostItemsByUser: (userId: string) => LostItem[];
  getLostItemById: (id: string) => LostItem | null;
  // Actions para Found Items
  addFoundItem: (item: Omit<FoundItem, 'id' | 'status'>) => void;
  updateFoundItem: (id: string, item: Partial<FoundItem>) => void;
  deleteFoundItem: (id: string) => void;
  getFoundItemsByUser: (userId: string) => FoundItem[];
  // Actions para Matches
  createMatch: (lostItemId: string, foundItemId: string) => void;
  getMatchesByLostItemId: (lostItemId: string) => Match[];
}

export const useItemsStore = create<ItemsState>((set, get) => ({
  lostItems: [],
  foundItems: [],
  matches: [],

  // Lost Items actions
  addLostItem: (item) => set((state) => ({
    lostItems: [...state.lostItems, {
      ...item,
      id: Math.random().toString(36).substr(2, 9),
      status: "pending"
    }]
  })),

  updateLostItem: (id, updatedItem) => set((state) => ({
    lostItems: state.lostItems.map(item => 
      item.id === id ? { ...item, ...updatedItem } : item
    )
  })),

  deleteLostItem: (id) => set((state) => ({
    lostItems: state.lostItems.filter(item => item.id !== id)
  })),

  getLostItemsByUser: (userId) => {
    const state = get();
    return state.lostItems.filter(item => item.seekerId === userId);
  },

  getLostItemById: (id) => {
    const state = get();
    return state.lostItems.find(item => item.id === id) || null;
  },

  // Found Items actions
  addFoundItem: (item) => set((state) => ({
    foundItems: [...state.foundItems, {
      ...item,
      id: Math.random().toString(36).substr(2, 9),
      status: "pending"
    }]
  })),

  updateFoundItem: (id, updatedItem) => set((state) => ({
    foundItems: state.foundItems.map(item => 
      item.id === id ? { ...item, ...updatedItem } : item
    )
  })),

  deleteFoundItem: (id) => set((state) => ({
    foundItems: state.foundItems.filter(item => item.id !== id)
  })),

  getFoundItemsByUser: (userId) => {
    const state = get();
    return state.foundItems.filter(item => item.finderId === userId);
  },

  // Match actions
  createMatch: (lostItemId, foundItemId) => {
    const state = get();
    const newMatch: Match = {
      id: Math.random().toString(36).substr(2, 9),
      lostItemId,
      foundItemId,
      status: "completed",
      matchDate: new Date(),
    };

    // Actualizar estado de ambos items
    get().updateLostItem(lostItemId, { status: "matched" });
    get().updateFoundItem(foundItemId, { status: "matched" });

    // Agregar el match
    set((state) => ({
      matches: [...state.matches, newMatch]
    }));
  },

  getMatchesByLostItemId: (lostItemId) => {
    const state = get();
    return state.matches.filter(match => match.lostItemId === lostItemId);
  },
})); 