import { User } from "@prisma/client";
import { db } from "./db";
import { getSelf } from "./auth-service";

export const getRecommended = async (): Promise<User[]> => {
  let userId;
  try {
    const self = await getSelf();
    userId = self.id;
  } catch (err) {
    userId = null;
  }
  let users = [];
  if (userId) {
    users = await db.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
      where: {
        AND: [
          {
            NOT: {
              id: userId,
            },
          },
          {
            NOT: {
              followedBy: {
                some: {
                  followerId: userId,
                },
              },
            },
          },
          {
            NOT: {
              blocking: {
                some: {
                  blockedId: userId,
                },
              },
            },
          },
        ],
      },
    });
  } else {
    users = await db.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
  }
  return users;
};
