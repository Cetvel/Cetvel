'use client';

import React, { useState, useCallback } from 'react';
import { Button } from '../ui/button';
import { useModal } from '@/providers/modal-provider';
import { UserButton } from '@clerk/nextjs';
import { useTheme } from 'next-themes';
import { dark } from '@clerk/themes';
import { Maximize, Minimize } from 'lucide-react';
import NotificationsButton from './notifications';

type Props = {
  title: string;
};

const PageHeader = ({ title }: Props) => {
  const { setOpen } = useModal();
  const { resolvedTheme } = useTheme();
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement
        .requestFullscreen()
        .then(() => {
          setIsFullscreen(true);
        })
        .catch((err) => {
          console.error(
            `Error attempting to enable fullscreen: ${err.message}`
          );
        });
    } else {
      if (document.exitFullscreen) {
        document
          .exitFullscreen()
          .then(() => {
            setIsFullscreen(false);
          })
          .catch((err) => {
            console.error(
              `Error attempting to exit fullscreen: ${err.message}`
            );
          });
      }
    }
  }, []);

  return (
    <div className='flex w-full items-center justify-between z-50 mb-6'>
      <h1 className='text-2xl lg:text-3xl font-bold'>{title}</h1>
      <div className='items-center border rounded-xl flex p-1 shadow-sm'>
        <Button variant={'ghost'} size={'icon'} onClick={toggleFullscreen}>
          {isFullscreen ? <Minimize size={18} /> : <Maximize size={18} />}
        </Button>
        <NotificationsButton />
        <div className='h-5 flex items-center justify-center px-4 pr-3 border-l-2'>
          <UserButton
            appearance={{
              baseTheme: resolvedTheme === 'dark' ? dark : undefined,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default PageHeader;
