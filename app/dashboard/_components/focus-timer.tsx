'use client';

import React, { useEffect, useState } from 'react';
import { useModal } from '@/providers/modal-provider';
import { Button } from '@/components/ui/button';
import Modal from '@/components/global/modal';
import FocusForge from '@/components/forms/focus-timer-form';
import { getUser } from '@/lib/utils';

const FocusTimer = () => {
  const { setOpen } = useModal();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    async function fetchUser() {
      const user = await getUser();
      setUser(user);
    }
    fetchUser();
  }, []);

  return (
    <>
      <div
        className='relative rounded-xl lg:col-span-2 shadow-sm p-6 h-[300px] flex flex-col md:h-full justify-between items-stretch'
        style={{
          backgroundImage: `url(${user?.timer_picture || 'https://media.stockimg.ai/template/image/lmqBF4GblmFF.png'})`,
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
