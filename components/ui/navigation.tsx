import Link from 'next/link';
import React from 'react';
import { Button } from './button';
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from './sheet';
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from '@clerk/nextjs';
import { dark } from '@clerk/themes';
import { Menu } from 'lucide-react';

const Navigation = async () => {
  return (
    <>
      {/* Main Nav */}
      <nav className='fixed border-b border-neutral-200 dark:border-neutral-500 !z-30 flex top-0 right-0 left-0 px-6 py-3 backdrop-blur-lg !bg-opacity-60 flex-row items-center justify-between'>
        <Link href={'/'}>
          <h2 className='text-xl font-bold'>Cetvel</h2>
        </Link>
        <ul className='hidden md:flex gap-6 items-center absolute left-1/2 transform -translate-x-1/2'>
          <li>
            <Link href='/' className='nav-link'>
              Anasayfa
            </Link>
          </li>
          <li>
            <Link href='/' className='nav-link'>
              Hakkında
            </Link>
          </li>
          <li>
            <Link href='/' className='nav-link'>
              Özellikler
            </Link>
          </li>
          <li>
            <Link href='/' className='nav-link'>
              Fiyatlar
            </Link>
          </li>
        </ul>
        <SignedOut>
          <div className='hidden md:flex items-center gap-4'>
            <SignInButton>
              <Button variant='secondary' size='sm'>
                Giriş Yap
              </Button>
            </SignInButton>
            <SignUpButton>
              <Button size='sm'>Kayıt Ol</Button>
            </SignUpButton>
          </div>
        </SignedOut>
        <SignedIn>
          <div className='hidden md:flex items-center gap-4'>
            <Link href='/dashboard'>
              <Button variant='secondary' size='sm'>
                Panele git
              </Button>
            </Link>
            <UserButton />
          </div>
        </SignedIn>

        {/* Side Nav */}
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant={'secondary'}
              size={'icon'}
              className='flex md:hidden'
            >
              <Menu size={24} />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <h2 className='text-xl font-bold'>Cetvel</h2>
            </SheetHeader>

            <SignedOut>
              <div className='flex flex-col space-y-4 mt-10'>
                <Link href={'/login'}>
                  <Button variant='secondary' className='w-full'>
                    Giriş Yap
                  </Button>
                </Link>
                <Link href={'/register'}>
                  <Button className='w-full'>Kayıt Ol</Button>
                </Link>
              </div>
            </SignedOut>
          </SheetContent>
        </Sheet>
      </nav>
    </>
  );
};

export default Navigation;
