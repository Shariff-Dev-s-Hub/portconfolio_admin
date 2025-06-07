import { LayoutTemplate } from "lucide-react";
import { create } from "zustand";

interface SidebarStore {
  isDrawerOpen: boolean;
  setIsDrawerOpen: () => void;
  activeTab: {
    displayText: string;
    value: string;
    logo: React.ReactNode;
  };
  setActiveTab: (tab: { displayText: string; value: string; logo: React.ReactNode }) => void;
}

export const useSidebarStore = create<SidebarStore>((set) => ({
  isDrawerOpen: false,
  activeTab: {
    displayText: "Hero",
    value: "hero",
    logo: <LayoutTemplate />,
  },
  setIsDrawerOpen: () =>
    set((state) => ({ isDrawerOpen: !state.isDrawerOpen })),
  setActiveTab: (tab) => {
    set({ activeTab: { ...tab } });
    set({ isDrawerOpen: false });
  },
}));
