"use server";
import { followUser, unfollowUser } from "@/lib/follow-service";
import { revalidatePath } from "next/cache";

export const onFollow = async (id: string) => {
  try {
    const follow = await followUser(id);

    revalidatePath("/");

    if (follow) {
      revalidatePath(`/${follow.following.username}`);
    }

    return follow;
  } catch (error) {
    throw new Error("Internal Error");
  }
};

export const onUnfollow = async (id: string) => {
  try {
    const unfollow = await unfollowUser(id);

    revalidatePath("/");

    if (unfollow) {
      revalidatePath(`/${unfollow.following.username}`);
    }

    return unfollow;
  } catch (error) {
    throw new Error("Internal Error");
  }
};
