"use client";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/store/user-sidebar";
import { useEffect } from "react";
import { useMediaQuery } from "usehooks-ts";

type ContainerProps = {
  children: React.ReactNode;
};

export const Container = ({ children }: ContainerProps) => {
  const { collapsed, onCollapse, onExpand } = useSidebar((state) => state);
  const match = useMediaQuery("(max-width: 1024px)");

  useEffect(() => {
    match ? onCollapse() : onExpand();
  }, [match]);

  return (
    <div
      className={cn(collapsed ? "ml-[70px]" : "ml-[70px] lg:ml-60", "flex-1")}
    >
      {children}
    </div>
  );
};
