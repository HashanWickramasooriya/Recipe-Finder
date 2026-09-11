import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface ShoppingListItem {
  id: string;
  text: string;
  recipeName: string;
  checked: boolean;
}

interface ShoppingListState {
  items: ShoppingListItem[];
  addItems: (recipeName: string, ingredients: string[]) => void;
  toggleItem: (id: string) => void;
  removeItem: (id: string) => void;
  clearList: () => void;
}

export const useShoppingListStore = create<ShoppingListState>()(
  persist(
    (set) => ({
      items: [],
      addItems: (recipeName, ingredients) =>
        set((state) => ({
          items: [
            ...state.items,
            ...ingredients.map((text, i) => ({
              id: `${Date.now()}-${i}-${Math.random().toString(36).slice(2, 8)}`,
              text,
              recipeName,
              checked: false,
            })),
          ],
        })),
      toggleItem: (id) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...item, checked: !item.checked } : item,
          ),
        })),
      removeItem: (id) =>
        set((state) => ({ items: state.items.filter((item) => item.id !== id) })),
      clearList: () => set({ items: [] }),
    }),
    { name: "rf_shopping_list" },
  ),
);
