'use client';

import { menuLinks } from '@/constants';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import Logo from './logo';

const Sidebar = () => {
  const pathname = usePathname();
  const splitPath = pathname!.split('/');
  const path = splitPath.slice(0, 3).join('/');

  return (
    <aside
      id='sidebar'
      className='bg-card border-r fixed w-64 p-6 hidden h-[500rem] xl:flex flex-col gap-6'
    >
      <div className='flex gap-3 items-center'>
        <Logo size={30} />
      </div>

      {/* Menu */}
      <nav className='flex flex-col gap-2'>
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
                'flex items-center text-muted-foreground rounded-xl px-4 gap-[0.65rem] md:w-[290px] py-2.5',
                {
                  'text-white bg-primary': path === link.href,
                }
              )}
            >
              {link.icon}
              <span>{link.label}</span>
            </Link>
          )
        )}
      </nav>
    </aside>
  );
};

export default Sidebar;
