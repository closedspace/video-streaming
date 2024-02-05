"use client";
import { Conditional } from "@/components/conditional";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/store/user-sidebar";
import { useEffect, useState } from "react";
import { RecommendedSkeleton } from "./recommended";
import { ToggleSkeleton } from "./toggle";
import { useIsClient } from "usehooks-ts";

type WrapperProps = {
  children: React.ReactNode;
};
export const Wrapper = ({ children }: WrapperProps) => {
  const { collapsed } = useSidebar((state) => state);
  const isClient = useIsClient();

  return (
    <>
      <Conditional on={isClient}>
        <aside
          className={cn(
            "fixed left-0 flex-col h-full border-r w-60 bg-background border-r[#2D2E35] z-50",
            collapsed && "w-[70px]"
          )}
        >
          {children}
        </aside>
      </Conditional>
      <Conditional on={!isClient}>
        <aside
          className={cn(
            "fixed left-0 flex-col h-full border-r w-[70px] lg:w-60 bg-background border-r[#2D2E35] z-50"
          )}
        >
          <ToggleSkeleton />
          <RecommendedSkeleton />
        </aside>
      </Conditional>
    </>
  );
};
