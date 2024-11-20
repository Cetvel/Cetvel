import React from 'react';
import ProfileForm from '@/features/users/forms/profile-form';
import EmailForm from '@/features/users/forms/email-form';

const AccountSettings = async () => {
  return (
    <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
      <ProfileForm />
      <EmailForm />
    </div>
  );
};

export default AccountSettings;
