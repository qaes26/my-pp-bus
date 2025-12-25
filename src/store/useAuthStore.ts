import { create } from 'zustand';

interface AuthState {
    isAuthenticated: boolean;
    studentId: string | null;
    login: (studentId: string, password: string) => Promise<boolean>;
    logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    isAuthenticated: false,
    studentId: null,

    login: async (studentId, password) => {
        // Mock Login Logic
        // In a real app, this would verify credentials with a backend
        if (studentId.trim() !== '' && password.trim() !== '') {
            set({ isAuthenticated: true, studentId: studentId });
            return true;
        }
        return false;
    },

    logout: () => {
        set({ isAuthenticated: false, studentId: null });
    }
}));
