import React from 'react';
import ProfileForm from '@/components/forms/profile-form';

const AccountSettings = async () => {
  return (
    <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
      <ProfileForm />
    </div>
  );
};

export default AccountSettings;
