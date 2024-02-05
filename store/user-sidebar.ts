import { create } from "zustand";

type SidebarStore = {
  collapsed: boolean;
  onCollapse: () => void;
  onExpand: () => void;
};

export const useSidebar = create<SidebarStore>((set) => ({
  collapsed: false,
  onCollapse: () => set({ collapsed: true }),
  onExpand: () => set({ collapsed: false }),
}));
