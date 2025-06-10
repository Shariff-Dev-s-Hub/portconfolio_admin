import { create } from "zustand";

interface LoaderStore {
  isLoading: boolean;
  isImageUploading: boolean;
  setImageUploading: (uploading: boolean) => void;
  setLoading: (loading: boolean) => void;
}

export const useLoaderStore = create<LoaderStore>((set) => ({ 
  isLoading: false,
  setLoading: (loading: boolean) => set({ isLoading: loading }),
  isImageUploading: false,
  setImageUploading: (uploading: boolean) =>
    set({ isImageUploading: uploading }),
}));
