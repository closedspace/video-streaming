"use client";
import { Conditional } from "@/components/conditional";
import { useSidebar } from "@/store/user-sidebar";
import { User } from "@prisma/client";
import { UserItem, UserItemSkeleton } from "./user-item";

type RecommendedProps = {
  data: User[];
};
export const Recommended = ({ data }: RecommendedProps) => {
  const { collapsed } = useSidebar((state) => state);

  const showLabel = !collapsed && data.length > 0;
  return (
    <>
      <Conditional on={showLabel}>
        <div className="pl-6 mb-4">
          <p className="text-sm text-muted-foreground">Recommended</p>
        </div>
      </Conditional>
      <div className="flex flex-col items-center">
        {data.map((user) => (
          <UserItem
            key={user.id}
            username={user.username}
            imageUrl={user.imageUrl}
            isLive={false} // TODO: update when we track user live status
          />
        ))}
      </div>
    </>
  );
};

export const RecommendedSkeleton = () => {
  return (
    <ul className="pl-3">
      {[...Array(3)].map((_, ind) => (
        <UserItemSkeleton key={ind} />
      ))}
    </ul>
  );
};
