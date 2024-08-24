import { useUser } from "@clerk/nextjs";

function UserProfile() {
  const { user } = useUser();

  return (
    <div>
      {user?.firstName} {user?.lastName}
    </div>
  );
}

export default UserProfile;
