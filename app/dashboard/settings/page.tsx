import React from 'react';
import ProfileForm from '@/components/forms/profile-form';
import EmailForm from '@/components/forms/email-form';
import ChangePasswordForm from '@/components/forms/change-password-form';

const AccountSettings = async () => {
  return (
    <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
      <ProfileForm />
      <EmailForm />
      <ChangePasswordForm />
    </div>
  );
};

export default AccountSettings;
