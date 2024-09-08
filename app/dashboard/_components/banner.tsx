'use client';

import { useUser } from '@clerk/nextjs';
import React from 'react';

const Banner = () => {
  const { user } = useUser();

  return (
    <div
      className='relative rounded-xl shadow-sm lg:col-span-5 h-[250px] p-3 md:p-6 gap-6 md:gap-0 flex flex-col justify-between'
      style={{
        backgroundImage:
          'url(https://images.wallpaperscraft.com/image/single/planet_satellite_horizon_127491_3692x2308.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundBlendMode: 'multiply',
      }}
    >
      <div className='flex flex-col gap-2 w-full '>
        <h2 className='text-3xl md:text-4xl text-white font-bold'>
          Hoşgeldin {user?.username}!
        </h2>
        <p className='text-primary-foreground'>
          <span className='font-medium'>
            &quot;Başarının sırrı, pes etmemekte yatar.&quot;
          </span>
        </p>
      </div>
    </div>
  );
};

export default Banner;
