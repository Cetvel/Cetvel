'use client';

import Error from '@/components/global/error';
import Spinner from '@/components/ui/spinner';
import { fetcher } from '@/lib/utils';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';

import React, { useEffect, useState } from 'react';
import useSWR from 'swr';

const Banner = () => {
  const { getUser: getKindeUser } = useKindeBrowserClient();
  const kindeUser = getKindeUser();

  const { data: user, isLoading, error } = useSWR('/users', fetcher);

  if (isLoading) return <Spinner size={24} />;

  if (error)
    return (
      <Error
        title='Bir hata oluştu'
        message={error.message || 'Beklenmedik sunucu hatası'}
      />
    );

  return (
    <div
      className='relative rounded-xl shadow-sm lg:col-span-5 h-[250px] p-3 md:p-6 gap-6 md:gap-0 flex flex-col justify-between'
      style={{
        backgroundImage: `url(${user?.cover_picture || 'https://media.stockimg.ai/image/v2/fBaFEiM6clFf.png'})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundBlendMode: 'multiply',
        backgroundColor: 'rgba(0,0,0,0.3)',
      }}
    >
      <div className='flex flex-col items-center justify-center gap-2 w-full h-full'>
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
