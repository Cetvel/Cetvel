import React from 'react';
import Spinner from '../ui/spinner';
import Logo from './logo';

const LoadingUI = () => {
  return (
    <aside className='w-full h-screen bg-background flex items-center justify-center flex-col z-[99999] gap-6'>
      <Logo size={100} />
      <Spinner size={45} />
    </aside>
  );
};

export default LoadingUI;
