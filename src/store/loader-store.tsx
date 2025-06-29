import { create } from "zustand";

interface LoaderStore {
  isLoading: boolean;
  isImageUploading: boolean;
  imageType: string;
  setImageUploading: (uploading: boolean) => void;
  setLoading: (loading: boolean) => void;
  setImageType: (type: string) => void;
}

export const useLoaderStore = create<LoaderStore>((set) => ({
  isLoading: false,
  imageType: "",
  setImageType: (type: string | ((prev: string) => string)) =>
    set((state) => ({
      imageType: typeof type === "function" ? type(state.imageType) : type,
    })),
  setLoading: (loading: boolean) => set({ isLoading: loading }),
  isImageUploading: false,
  setImageUploading: (uploading: boolean) =>
    set({ isImageUploading: uploading }),
}));
