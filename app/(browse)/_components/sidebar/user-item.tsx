"use client";

import { Avatar } from "@/components/ui/avatar";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/store/user-sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { UserAvatar } from "@/components/user-avatar";
import { Conditional } from "@/components/conditional";
import { LiveBadge } from "@/components/live-badge";

type UserItemProps = {
  username: string;
  isLive: boolean;
  imageUrl: string;
};
export const UserItem = ({ username, isLive, imageUrl }: UserItemProps) => {
  const { collapsed } = useSidebar((state) => state);
  const pathname = usePathname();
  const href = `/${username}`;
  const isActive = pathname === href;
  return (
    <Button
      asChild
      variant="ghost"
      className={cn(
        "w-full h-12",
        collapsed ? "justify-center" : "justify-start",
        isActive && "bg-accent"
      )}
    >
      <Link href={href}>
        <div
          className={cn(
            "flex items-center w-full gap-x-4",
            collapsed && "justify-center"
          )}
        >
          <UserAvatar
            imageUrl={imageUrl}
            isLive={isLive}
            username={username}
            showBadge={true}
          />
          <Conditional on={!collapsed}>
            <p className="truncate">{username}</p>
          </Conditional>
          <Conditional on={!collapsed && isLive}>
            <LiveBadge className="ml-auto" />
          </Conditional>
        </div>
      </Link>
    </Button>
  );
};

export const UserItemSkeleton = () => {
  return (
    <li className="flex items-center px-3 py-2 gap-x-4">
      <Skeleton className="min-h-[32px] min-w-[32px] rounded-full" />
      <div className="flex-1 hidden lg:flex">
        <Skeleton className="h-6 w-36" />
      </div>
    </li>
  );
};
