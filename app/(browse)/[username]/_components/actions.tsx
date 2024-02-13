"use client";
import { onBlock, onUnblock } from "@/actions/block";
import { onFollow, onUnfollow } from "@/actions/follow";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { toast } from "sonner";

type ActionsProps = {
  userId: string;
  isFollowing: boolean;
};

export const Actions = ({ userId, isFollowing }: ActionsProps) => {
  const [isPending, startTransition] = useTransition();

  const handleFollow = () => {
    startTransition(() => {
      onFollow(userId)
        .then((r) => {
          toast.success(`You are now following ${r.following.username}`);
        })
        .catch((err) => {
          toast.error("Failed to follow user");
        });
    });
  };

  const handleUnfollow = () => {
    startTransition(() => {
      onUnfollow(userId)
        .then((r) => {
          toast.success(`You are no longer following ${r.following.username}`);
        })
        .catch((err) => {
          toast.error("Failed to unfollow user");
        });
    });
  };

  const onClick = isFollowing ? handleUnfollow : handleFollow;

  const handleBlock = () => {
    startTransition(() => {
      onBlock(userId)
        .then((r) => {
          toast.success(`You have blocked ${r.blocked.username}`);
        })
        .catch((err) => {
          toast.error("Failed to block user");
        });
    });
  };

  const handleUnblock = () => {
    startTransition(() => {
      onUnblock(userId)
        .then((r) => {
          toast.success(`You have unblocked ${r.blocked.username}`);
        })
        .catch((err) => {
          toast.error("Failed to unblock user");
        });
    });
  };

  return (
    <>
      <Button
        disabled={isPending}
        size="lg"
        variant="primary"
        onClick={onClick}
      >
        {isFollowing ? "Unfollow" : "Follow"}
      </Button>
      <Button variant="destructive" size="lg" onClick={handleUnblock}>
        Block
      </Button>
    </>
  );
};
