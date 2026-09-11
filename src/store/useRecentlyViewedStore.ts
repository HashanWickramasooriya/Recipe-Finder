import { create } from "zustand";
import { persist } from "zustand/middleware";

interface RecentlyViewedState {
  recentIds: string[];
  addRecent: (id: string) => void;
  clearRecent: () => void;
}

const MAX_RECENT = 12;

export const useRecentlyViewedStore = create<RecentlyViewedState>()(
  persist(
    (set) => ({
      recentIds: [],
      addRecent: (id) =>
        set((state) => ({
          recentIds: [id, ...state.recentIds.filter((x) => x !== id)].slice(0, MAX_RECENT),
        })),
      clearRecent: () => set({ recentIds: [] }),
    }),
    { name: "rf_recently_viewed" },
  ),
);
