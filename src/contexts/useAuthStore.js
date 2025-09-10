import { create } from "zustand";
import { login as apiLogin, register as apiRegister, logout as apiLogout, verifyToken } from "../services/authService";

const useAuthStore = create((set, get) => ({
    user: null,
    isAuthenticated: false,
    isLoading: true,
    login: async (credentials) => {
        const data = await apiLogin(credentials);
        if (data.user) {
            set({ user: data.user, isAuthenticated: true });
        }
        return data;
    },
    register: async (userData) => {
        const data = await apiRegister(userData);
        if (data.user) {
            set({ user: data.user, isAuthenticated: true });
        }
        return data;
    },
    logout: () => {
        apiLogout();
        set({ user: null, isAuthenticated: false });
    },
    checkAuth: async () => {
        try {
            const data = await verifyToken();
            if (data.user) {
                set({ user: data.user, isAuthenticated: true, isLoading: false });
            } else {
                set({ isLoading: false });
            }
        } catch (error) {
            set({ user: null, isAuthenticated: false, isLoading: false });
        }
    },
    updateUser: (newUserData) => {
        set((state) => ({
            user: { ...state.user, ...newUserData },
        }));
    },
}));

export default useAuthStore;
