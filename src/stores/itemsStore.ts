import { create } from 'zustand';
import { LostItem, FoundItem, Match } from '../types/models';
import { ItemType, Location, LostItemStatus, FoundItemStatus, MatchStatus } from '../types/enums';
import { 
  collection, 
  doc, 
  setDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  onSnapshot,
  Timestamp,
  getDocs,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '../config/firebase';

interface ItemsState {
  lostItems: LostItem[];
  foundItems: FoundItem[];
  matches: Match[];
  isLoading: boolean;
  error: string | null;
  // Actions
  initialize: () => () => void; // Returns cleanup function
  // Lost Items actions
  addLostItem: (item: Omit<LostItem, 'id' | 'status'>) => Promise<string>;
  updateLostItem: (id: string, item: Partial<LostItem>) => Promise<void>;
  deleteLostItem: (id: string) => Promise<void>;
  getLostItemsByUser: (userId: string) => LostItem[];
  getLostItemById: (id: string) => LostItem | null;
  // Found Items actions
  addFoundItem: (item: Omit<FoundItem, 'id' | 'status'>) => Promise<string>;
  updateFoundItem: (id: string, item: Partial<FoundItem>) => Promise<void>;
  deleteFoundItem: (id: string) => Promise<void>;
  getFoundItemsByUser: (userId: string) => FoundItem[];
  // Match actions
  createMatch: (lostItemId: string, foundItemId: string) => Promise<void>;
  getMatchesByLostItemId: (lostItemId: string) => Match[];
}

export const useItemsStore = create<ItemsState>((set, get) => ({
  lostItems: [],
  foundItems: [],
  matches: [],
  isLoading: true,
  error: null,

  initialize: () => {
    // Subscribe to lost items
    const unsubLostItems = onSnapshot(
      collection(db, 'lostItems'),
      (snapshot) => {
        const items = snapshot.docs.map(doc => 
          LostItem.fromFirestore(doc.id, doc.data())
        );
        set({ lostItems: items, isLoading: false });
      },
      (error) => {
        console.error('Error fetching lost items:', error);
        set({ error: 'Error al cargar los objetos perdidos', isLoading: false });
      }
    );

    // Subscribe to found items
    const unsubFoundItems = onSnapshot(
      collection(db, 'foundItems'),
      (snapshot) => {
        const items = snapshot.docs.map(doc => 
          FoundItem.fromFirestore(doc.id, doc.data())
        );
        set({ foundItems: items });
      },
      (error) => {
        console.error('Error fetching found items:', error);
        set({ error: 'Error al cargar los objetos encontrados' });
      }
    );

    // Subscribe to matches
    const unsubMatches = onSnapshot(
      collection(db, 'matches'),
      (snapshot) => {
        const matches = snapshot.docs.map(doc => 
          Match.fromFirestore(doc.id, doc.data())
        );
        set({ matches });
      },
      (error) => {
        console.error('Error fetching matches:', error);
        set({ error: 'Error al cargar las coincidencias' });
      }
    );

    // Return cleanup function
    return () => {
      unsubLostItems();
      unsubFoundItems();
      unsubMatches();
    };
  },

  // Lost Items actions
  addLostItem: async (itemData) => {
    try {
      const docRef = doc(collection(db, 'lostItems'));
      const newItem = new LostItem({
        ...itemData,
        id: docRef.id,
        status: LostItemStatus.SEARCHING,
      });
      
      await setDoc(docRef, newItem.toFirestore());
      return docRef.id;
    } catch (error) {
      console.error('Error adding lost item:', error);
      set({ error: 'Error al agregar el objeto perdido' });
      throw error;
    }
  },

  updateLostItem: async (id, updatedData) => {
    try {
      const itemRef = doc(db, 'lostItems', id);
      const currentItem = get().lostItems.find(item => item.id === id);
      
      if (!currentItem) {
        throw new Error('Item not found');
      }

      const updatedItem = new LostItem({
        ...currentItem,
        ...updatedData,
      });

      await updateDoc(itemRef, updatedItem.toFirestore());
    } catch (error) {
      console.error('Error updating lost item:', error);
      set({ error: 'Error al actualizar el objeto perdido' });
      throw error;
    }
  },

  deleteLostItem: async (id) => {
    try {
      await deleteDoc(doc(db, 'lostItems', id));
    } catch (error) {
      console.error('Error deleting lost item:', error);
      set({ error: 'Error al eliminar el objeto perdido' });
      throw error;
    }
  },

  getLostItemsByUser: (userId) => {
    return get().lostItems.filter(item => item.seekerId === userId);
  },

  getLostItemById: (id) => {
    return get().lostItems.find(item => item.id === id) || null;
  },

  // Found Items actions
  addFoundItem: async (itemData) => {
    try {
      const docRef = doc(collection(db, 'foundItems'));
      const newItem = new FoundItem({
        ...itemData,
        id: docRef.id,
        status: FoundItemStatus.PENDING,
      });
      
      await setDoc(docRef, newItem.toFirestore());
      return docRef.id;
    } catch (error) {
      console.error('Error adding found item:', error);
      set({ error: 'Error al agregar el objeto encontrado' });
      throw error;
    }
  },

  updateFoundItem: async (id, updatedData) => {
    try {
      const itemRef = doc(db, 'foundItems', id);
      const currentItem = get().foundItems.find(item => item.id === id);
      
      if (!currentItem) {
        throw new Error('Item not found');
      }

      const updatedItem = new FoundItem({
        ...currentItem,
        ...updatedData,
      });

      await updateDoc(itemRef, updatedItem.toFirestore());
    } catch (error) {
      console.error('Error updating found item:', error);
      set({ error: 'Error al actualizar el objeto encontrado' });
      throw error;
    }
  },

  deleteFoundItem: async (id) => {
    try {
      await deleteDoc(doc(db, 'foundItems', id));
    } catch (error) {
      console.error('Error deleting found item:', error);
      set({ error: 'Error al eliminar el objeto encontrado' });
      throw error;
    }
  },

  getFoundItemsByUser: (userId) => {
    return get().foundItems.filter(item => item.finderId === userId);
  },

  // Match actions
  createMatch: async (lostItemId, foundItemId) => {
    try {
      const docRef = doc(collection(db, 'matches'));
      const newMatch = new Match({
        id: docRef.id,
        lostItemId,
        foundItemId,
        status: MatchStatus.PENDING,
        matchDate: new Date(),
      });
      
      await setDoc(docRef, newMatch.toFirestore());

      // Actualizar estado de ambos items
      await get().updateLostItem(lostItemId, { status: LostItemStatus.FOUND });
      await get().updateFoundItem(foundItemId, { status: FoundItemStatus.MATCHED });
    } catch (error) {
      console.error('Error creating match:', error);
      set({ error: 'Error al crear la coincidencia' });
      throw error;
    }
  },

  getMatchesByLostItemId: (lostItemId) => {
    return get().matches.filter(match => match.lostItemId === lostItemId);
  },
})); 