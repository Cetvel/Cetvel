import React from 'react';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import UserSettingsForm from '@/components/forms/user-settings-form';

const { getUser } = getKindeServerSession();

const AccountSettings = async () => {
  const user = await getUser();

  return <UserSettingsForm user={user} />;
};

export default AccountSettings;
