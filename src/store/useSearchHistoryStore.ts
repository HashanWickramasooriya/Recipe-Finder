import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SearchHistoryState {
  history: string[];
  addSearch: (query: string) => void;
  clearHistory: () => void;
}

const MAX_HISTORY = 8;

export const useSearchHistoryStore = create<SearchHistoryState>()(
  persist(
    (set) => ({
      history: [],
      addSearch: (query) => {
        const trimmed = query.trim();
        if (!trimmed) return;
        set((state) => ({
          history: [trimmed, ...state.history.filter((x) => x.toLowerCase() !== trimmed.toLowerCase())].slice(
            0,
            MAX_HISTORY,
          ),
        }));
      },
      clearHistory: () => set({ history: [] }),
    }),
    { name: "rf_search_history" },
  ),
);
