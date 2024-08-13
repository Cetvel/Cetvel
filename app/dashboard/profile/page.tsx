import { useUser } from '@clerk/clerk-react';

function UserProfile() {
  const { user } = useUser();
  
  // Kullanıcı kimliğini ve diğer bilgileri kullanarak işlemler yapabilirsiniz
  console.log(user?.id);  // Kullanıcı kimliği
  
  return (
    <div>
      {user?.firstName} {user?.lastName}
    </div>
  );
}

export default UserProfile;
