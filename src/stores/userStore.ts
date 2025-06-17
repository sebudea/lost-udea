import { create } from 'zustand';
import { User } from '../types/models';
import { auth, db } from '../config/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

interface UserState {
  currentUser: User | null;
  isLoading: boolean;
  error: string | null;
  // Actions
  initialize: () => void;
  setUser: (user: User | null) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useUserStore = create<UserState>((set) => ({
  currentUser: null,
  isLoading: true,
  error: null,

  initialize: () => {
    // Escuchar cambios en la autenticación
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      try {
        set({ isLoading: true, error: null });
        
        if (firebaseUser) {
          // Obtener datos adicionales del usuario desde Firestore
          const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
          
          if (userDoc.exists()) {
            // Crear instancia de User con los datos de Firestore
            const userData = User.fromFirestore(firebaseUser.uid, userDoc.data());
            set({ currentUser: userData, isLoading: false });
          } else {
            // Usuario autenticado pero sin datos en Firestore
            set({ 
              currentUser: new User({
                id: firebaseUser.uid,
                email: firebaseUser.email || '',
                fullName: firebaseUser.displayName || '',
                createdAt: new Date()
              }),
              isLoading: false 
            });
          }
        } else {
          // No hay usuario autenticado
          set({ currentUser: null, isLoading: false });
        }
      } catch (error) {
        console.error('Error initializing user:', error);
        set({ 
          error: 'Error al cargar la información del usuario',
          isLoading: false 
        });
      }
    });

    // Cleanup function
    return () => unsubscribe();
  },

  setUser: (user) => set({ currentUser: user }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error })
})); 