import { create } from "zustand";
import { persist } from "zustand/middleware";

export type DietaryPreference =
  | "none"
  | "vegetarian"
  | "vegan"
  | "gluten-free"
  | "dairy-free"
  | "halal"
  | "pescatarian";

interface User {
  name: string;
  email: string;
  dietaryPreference: DietaryPreference;
}

interface AuthState {
  user: User | null;
  signIn: (name: string, email: string) => void;
  signOut: () => void;
  updateProfile: (updates: Partial<User>) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      signIn: (name, email) =>
        set({ user: { name, email, dietaryPreference: "none" } }),
      signOut: () => set({ user: null }),
      updateProfile: (updates) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...updates } : state.user,
        })),
    }),
    { name: "rf_auth" },
  ),
);
