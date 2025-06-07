import { create } from "zustand";

interface LoaderStore {
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
}

export const useLoaderStore = create<LoaderStore>((set) => ({
  isLoading: false,
  setLoading: (loading: boolean) => set({ isLoading: loading }),
}));
