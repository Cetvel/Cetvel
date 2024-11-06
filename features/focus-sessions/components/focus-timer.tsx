'use client';

import React from 'react';
import { useModal } from '@/providers/modal-provider';
import { Button } from '@/components/ui/button';
import Modal from '@/components/global/modal';
import FocusForge from '@/features/focus-sessions/forms/focus-timer-form';
import { useUser } from '@/features/users/contexts/user-context';

const FocusTimer = () => {
  const { setOpen } = useModal();
  const { user, kindeUser } = useUser();

  return (
    <>
      <div
        className='relative rounded-xl lg:col-span-2 shadow-sm p-6 h-[300px] flex flex-col md:h-full justify-between items-stretch'
        style={{
          backgroundImage: `url(${user?.timer_picture || '/image/timer_default.jpg'})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundBlendMode: 'multiply',
          backgroundColor: 'rgba(0,0,0,0.2)',
        }}
      >
        <div className='flex flex-col grow items-center justify-center'>
          <div className='flex mb-4 items-center'>
            <h2 className='text-2xl font-bold text-white'>Odaklanma Modu</h2>
          </div>
          <Button
            onClick={() => {
              setOpen(
                <Modal title='Odaklanma oturumu'>
                  <FocusForge />
                </Modal>
              );
            }}
            size={'sm'}
          >
            Başlat
          </Button>
        </div>
      </div>
    </>
  );
};

export default FocusTimer;
