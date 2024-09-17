import Logo from '@/components/global/logo';
import React from 'react';

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main
      className='w-full min-h-screen flex flex-col items-center justify-center py-20'
      data-theme='dark'
    >
      <div className='flex space-x-4 items-center mb-10'>
        <Logo size={50} />
        <h1 className='text-3xl font-bold'>Cetvel</h1>
      </div>
      {children}
    </main>
  );
};

export default AuthLayout;
