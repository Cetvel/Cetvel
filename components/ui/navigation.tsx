'use client';

import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import {
  LoginLink,
  RegisterLink,
} from '@kinde-oss/kinde-auth-nextjs/components';
import SignedInClient from '../global/signed-in-client';
import SignedOutClient from '../global/signed-out-client';
import UserButton from '../global/user-button';
import Logo from '../global/logo';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isAuthenticated } = useKindeBrowserClient();

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navItems = [
    { name: 'Hakkında', href: '#about' },
    { name: 'Özellikler', href: '#features' },
    { name: 'İletişim', href: '#contact' },
  ];

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out',
        isScrolled
          ? 'bg-background/80 backdrop-blur-md border-b'
          : 'bg-transparent'
      )}
    >
      <div className='max-w-7xl relative mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-14'>
        {/* Logo */}
        <div className='flex-shrink-0'>
          <Link href='#' className='text-2xl font-bold text-primary'>
            <Logo size={40} />
          </Link>
        </div>

        <div className='hidden md:flex flex-grow items-center -z-10 justify-center pl-6 absolute inset-0'>
          <div className='flex items-center space-x-2'>
            {navItems.map((item) => (
              <Link key={item.name} href={item.href} className='nav-link'>
                {item.name}
              </Link>
            ))}
          </div>
        </div>

        <div className='hidden md:flex items-center space-x-4'>
          <SignedInClient>
            <Link href='/dashboard'>
              <Button variant='default' size={'sm'}>
                Panele git
              </Button>
            </Link>
            <UserButton />
          </SignedInClient>
          <SignedOutClient>
            <LoginLink>
              <Button variant='outline' size={'sm'}>
                Giriş Yap
              </Button>
            </LoginLink>
            <RegisterLink>
              <Button variant='default' size={'sm'}>
                Kayıt Ol
              </Button>
            </RegisterLink>
          </SignedOutClient>
        </div>

        {/* Mobile Menu Button */}
        <div className='md:hidden'>
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant='ghost' size='icon'>
                <Menu className='h-6 w-6' />
              </Button>
            </SheetTrigger>
            <SheetContent side='right' className='w-[300px] sm:w-[400px]'>
              <nav className='flex flex-col h-full'>
                <div className='flex items-center justify-between mb-6'>
                  <span className='text-lg font-semibold'>Menü</span>
                </div>
                <div className='space-y-4'>
                  {navItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className='block px-3 py-2 rounded-md text-base font-medium text-secondary-foreground hover:text-primary hover:bg-accent'
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
                <div className='mt-auto space-y-4 flex-col flex w-full'></div>
                <SignedInClient>
                  <Link href='/dashboard'>
                    <Button variant='default' size={'sm'}>
                      Panele git
                    </Button>
                  </Link>
                  <UserButton />
                </SignedInClient>
                <SignedOutClient>
                  <LoginLink>
                    <Button variant='outline'>Giriş Yap</Button>
                  </LoginLink>
                  <RegisterLink>
                    <Button variant='default'>Kayıt Ol</Button>
                  </RegisterLink>
                </SignedOutClient>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
