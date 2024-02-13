"use server";

import { getSelf } from "@/lib/auth-service";
import { db } from "@/lib/db";
import { getStreamByUserId } from "@/lib/stream-service";
import { Stream } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const updateStream = async (stream: Partial<Stream>) => {
  try {
    const self = await getSelf();
    const selfStream = await getStreamByUserId(self.id);

    if (!selfStream) {
      throw new Error("Stream doesn't exist");
    }

    const validData = {
      name: stream.name,
      isChatEnabled: stream.isChatEnabled,
      isChatFollowersOnly: stream.isChatFollowersOnly,
      isChatDelayed: stream.isChatDelayed,
    };

    const updatedStream = await db.stream.update({
      where: {
        id: selfStream.id,
      },
      data: {
        ...validData,
      },
    });
    revalidatePath(`/u/${self.username}/chat`);
    revalidatePath(`/u/${self.username}`);
    revalidatePath(`/${self.username}`);
  } catch (err) {
    throw new Error("err");
  }
};
