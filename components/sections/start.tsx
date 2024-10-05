'use client';

import React from 'react';
import { Meteors } from '@/components/global/meteors';
import { Button } from '../ui/button';
import { Sparkles } from 'lucide-react';
import { RegisterLink } from '@kinde-oss/kinde-auth-nextjs';
import SignedOutClient from '../global/signed-out-client';
import SignedInClient from '../global/signed-in-client';
import Link from 'next/link';

export function Start() {
  return (
    <div className=' w-full relative'>
      <div className='relative bg-light-400 dark:bg-dark-400 px-4 py-24 h-full overflow-hidden flex flex-col justify-end items-center'>
        <h2 className='text-3xl font-medium max-w-3xl text-center mb-8'>
          Yapay zeka destekli kişiselleştirilmiş öğrenme platformu ile sınav
          stresi sona, başarı sana gelsin. Hemen dene, farkı hisset!
        </h2>
        <SignedOutClient>
          <RegisterLink>
            <Button size='lg' className='w-max'>
              <Sparkles size={14} className='mr-1' />
              Hemen Başla
            </Button>
          </RegisterLink>
        </SignedOutClient>
        <SignedInClient>
          <Link href='/dashboard'>
            <Button size='lg'>
              <Sparkles size={14} className='mr-1' />
              Hemen Başla
            </Button>
          </Link>
        </SignedInClient>

        <Meteors number={40} />
      </div>
    </div>
  );
}
