import { create } from "zustand";

type SidebarStore = {
  collapsed: boolean;
  onCollapse: () => void;
  onExpand: () => void;
};

export const useSidebar = create<SidebarStore>((set) => ({
  collapsed: true,
  onCollapse: () => set({ collapsed: true }),
  onExpand: () => set({ collapsed: false }),
}));
