import { VariantProps, cva } from "class-variance-authority";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { cn } from "@/lib/utils";
import { Conditional } from "./conditional";
import { LiveBadge } from "./live-badge";
import { Skeleton } from "./ui/skeleton";

type UserAvatarProps = {
  imageUrl: string;
  isLive?: boolean;
  username: string;
  showBadge?: boolean;
} & VariantProps<typeof avatarSizes>;

const avatarSizes = cva("", {
  variants: {
    size: {
      default: "h-8 w-8",
      lg: "h-14 w14",
    },
  },
  defaultVariants: {
    size: "default",
  },
});
export const UserAvatar = ({
  imageUrl,
  isLive,
  username,
  showBadge,
  size,
}: UserAvatarProps) => {
  const canShowLiveBadge = !!(isLive && showBadge);
  return (
    <div className="relative">
      <Avatar
        className={cn(
          isLive && "ring-2 ring-rose-500 border border-background",
          avatarSizes({ size })
        )}
      >
        <AvatarImage src={imageUrl} className="object-cover" />
        <AvatarFallback>
          {username[0]} {username[username.length - 1]}
        </AvatarFallback>
      </Avatar>
      <Conditional on={canShowLiveBadge}>
        <div className="absolute transform -translate-x-1/2 -bottom-3 left-1/2">
          <LiveBadge />
        </div>
      </Conditional>
    </div>
  );
};

type UserAvatarSkeletonProps = VariantProps<typeof avatarSizes>;

export const UserAvatarSkeleton = ({ size }: UserAvatarSkeletonProps) => {
  return <Skeleton className={cn("", avatarSizes({ size }))} />;
};
