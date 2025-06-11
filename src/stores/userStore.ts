import { create } from 'zustand';
import { User, UserFormData } from '../types/models';

interface UserState {
  currentUser: User | null;
  // Actions
  register: (userData: UserFormData) => void;
  login: (email: string) => void;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
}

export const useUserStore = create<UserState>((set) => ({
  currentUser: null,

  register: (userData) => {
    const newUser: User = {
      ...userData,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date()
    };
    set({ currentUser: newUser });
  },

  login: (email) => {
    // Por ahora solo simulamos el login
    const mockUser: User = {
      id: "user123",
      email,
      fullName: "Usuario de Prueba",
      createdAt: new Date(),
      phoneNumber: "3001234567",
      idNumber: "1234567890"
    };
    set({ currentUser: mockUser });
  },

  logout: () => {
    set({ currentUser: null });
  },

  updateProfile: (data) => set((state) => ({
    currentUser: state.currentUser ? { ...state.currentUser, ...data } : null
  }))
})); 