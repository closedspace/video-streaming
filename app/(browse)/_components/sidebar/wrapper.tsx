"use client";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/store/user-sidebar";

type WrapperProps = {
  children: React.ReactNode;
};
export const Wrapper = ({ children }: WrapperProps) => {
  const { collapsed } = useSidebar((state) => state);

  return (
    <aside
      className={cn(
        "fixed left-0 flex-col h-full border-r w-60 bg-background border-r[#2D2E35] z-10",
        collapsed && "w-[70px]"
      )}
    >
      {children}
    </aside>
  );
};
