import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserState {
    email: string;
    setEmail: (email: string) => void;
    logout: () => void;
}

export const useUserStore = create<UserState>()(
    persist(
        (set) => ({
            email: '',
            setEmail: (email) => set({ email }),    
            logout: () => set({ email: '' }),
        }),
        {
            name: 'user-storage',   
        }
    )
);
