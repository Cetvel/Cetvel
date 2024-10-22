'use client';

import React, { useState, useCallback } from 'react';
import { Button } from '../ui/button';
import { useModal } from '@/providers/modal-provider';
import { useTheme } from 'next-themes';
import { Maximize, Menu, Minimize } from 'lucide-react';
import Link from 'next/link';
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from '../ui/sheet';
import { menuLinks } from '@/constants';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import UserButton from './user-button';
import { ThemeController } from '../ui/theme-controller';

type Props = {
  title: string;
};

const PageHeader = ({ title }: Props) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const pathname = usePathname();
  const splitPath = pathname!.split('/');
  const path = splitPath.slice(0, 3).join('/');

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
    <aside className='flex px-2 lg:px-0 w-full items-center justify-between z-50 mb-6'>
      <h1 className='text-2xl lg:text-3xl font-bold'>{title}</h1>
      <div
        id='header-user-actions'
        className='items-center border rounded-xl flex p-1 shadow-sm bg-card'
      >
        <Button variant={'ghost'} size={'icon'} onClick={toggleFullscreen}>
          {isFullscreen ? <Minimize size={18} /> : <Maximize size={18} />}
        </Button>
        <ThemeController />
        <div className='h-5 flex items-center justify-center px-4 pr-3 border-l-2 ml-2'>
          <UserButton />
        </div>
        <aside className='xl:hidden'>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant='ghost' size='icon'>
                <Menu size={18} />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <h2 className='text-2xl font-semibold select-none'>Cetvel</h2>
              </SheetHeader>

              <nav className='flex flex-col gap-2 mt-10'>
                {menuLinks.map(
                  (
                    link: {
                      label: string;
                      href: string;
                      icon: JSX.Element;
                    },
                    index: number
                  ) => (
                    <Link
                      key={index}
                      href={link.href}
                      className={cn(
                        'flex items-center rounded-xl px-4 gap-[0.65rem] md:w-[290px] py-2.5 text-secondary-content hover:text-accent-content',
                        {
                          '!text-white bg-primary': path === link.href,
                        }
                      )}
                    >
                      {link.icon}
                      <span>{link.label}</span>
                    </Link>
                  )
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </aside>
      </div>
    </aside>
  );
};

export default PageHeader;
