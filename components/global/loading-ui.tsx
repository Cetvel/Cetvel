import Image from 'next/image';
import React from 'react';
import Spinner from '../ui/spinner';

const LoadingUI = () => {
  return (
    <aside className='w-full h-screen bg-background flex items-center justify-center flex-col z-[99999] gap-6'>
      <Image src={'/image/logo.svg'} alt='Logo' width={100} height={100} />
      <Spinner size={45} />
    </aside>
  );
};

export default LoadingUI;
