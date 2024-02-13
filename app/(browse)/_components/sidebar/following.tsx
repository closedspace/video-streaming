"use client";
import { Conditional } from "@/components/conditional";
import { useSidebar } from "@/store/user-sidebar";
import { Follow, User } from "@prisma/client";
import { UserItem, UserItemSkeleton } from "./user-item";

type FollowingProps = {
  data: (Follow & { following: User })[];
};
export const Following = ({ data }: FollowingProps) => {
  const { collapsed } = useSidebar((state) => state);
  if (!data.length) {
    return null;
  }
  return (
    <div>
      <Conditional on={!collapsed}>
        <div className="pl-6 mb-4">
          <p className="text-sm text-muted-foreground">Following</p>
        </div>
      </Conditional>
      <ul className="space-y-2 px-2">
        {data.map((follow) => (
          <UserItem
            key={follow.id}
            username={follow.following.username}
            imageUrl={follow.following.imageUrl}
            isLive={false} // TODO: update when we track user live status
          />
        ))}
      </ul>
    </div>
  );
};

export const FollowingSkeleton = () => {
  return (
    <ul className="px-2 pt-2 lg:pt-0">
      {[...Array(3)].map((_, ind) => (
        <UserItemSkeleton key={ind} />
      ))}
    </ul>
  );
};
