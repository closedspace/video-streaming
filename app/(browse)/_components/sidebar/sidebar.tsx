import React from "react";
import { Wrapper } from "./wrapper";
import { Toggle } from "./toggle";
import { Recommended, RecommendedSkeleton } from "./recommended";
import { getRecommended } from "@/lib/recommended-service";

export const Sidebar = async () => {
  const recommended = await getRecommended();
  return (
    <Wrapper>
      <Toggle />
      <div className="pt-4 space-y-4 lg:pt-0">
        <Recommended data={recommended} />
      </div>
    </Wrapper>
  );
};

export const SidebarSkeleton = () => {
  return (
    <aside className="fixed left-0 flex w-[70px] lg:w-60 h-full bg-background border-[#2D2E35] z-50">
      <RecommendedSkeleton />
    </aside>
  );
};
