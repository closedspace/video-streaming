import { Conditional } from "@/components/conditional";
import { isFollowingUser } from "@/lib/follow-service";
import { getUserByUsername } from "@/lib/user-service";
import { notFound } from "next/navigation";
import { Actions } from "./_components/actions";
import { isBlockedByUser } from "@/lib/block-service";

type UserPageProps = {
  params: {
    username: string;
  };
};
const UserPage = async ({ params: { username } }: UserPageProps) => {
  const user = await getUserByUsername(username);
  if (!user) {
    notFound();
  }
  const isFollowing = await isFollowingUser(user.id);
  const isBlocked = await isBlockedByUser(user.id);

  if (isBlocked) {
    notFound();
  }

  return (
    <>
      <Conditional on={!!user}>
        <div className="flex flex-col gap-y-4">
          <p>username: {user.username}</p>

          <p>userwhatever: {user.id}</p>
          <p> is blocked by this user {`${isBlocked}`}</p>
          <p>is following: {String(isFollowing)}</p>
          <Actions isFollowing={isFollowing} userId={user.id} />
        </div>
      </Conditional>
    </>
  );
};

export default UserPage;
