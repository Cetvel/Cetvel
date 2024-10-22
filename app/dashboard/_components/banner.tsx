'use client';

import { getUser } from '@/lib/utils';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';

import React, { useEffect, useState } from 'react';

const Banner = () => {
  const [user, setUser] = useState<any>(null);
  const { getUser: getKindeUser } = useKindeBrowserClient();
  const kindeUser = getKindeUser();

  useEffect(() => {
    async function fetchUser() {
      const user = await getUser();
      setUser(user);
    }
    fetchUser();
  }, []);

  console.log(user);

  return (
    <div
      className='relative rounded-xl shadow-sm lg:col-span-5 h-[250px] p-3 md:p-6 gap-6 md:gap-0 flex flex-col justify-between'
      style={{
        backgroundImage: `url(${user?.cover_picture || 'https://media.stockimg.ai/template/image/vQYG-l0yZkLY.png'})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundBlendMode: 'multiply',
      }}
    >
      <div className='flex flex-col gap-2 w-full '>
        <h2 className='text-3xl md:text-4xl text-white font-bold'>
          Hoşgeldin {kindeUser?.given_name}!
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
