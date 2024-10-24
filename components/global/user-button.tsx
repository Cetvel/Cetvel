import React, { useEffect, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  LogoutLink,
  useKindeBrowserClient,
} from '@kinde-oss/kinde-auth-nextjs';
import { AlertCircle, LogOut } from 'lucide-react';
import { fetcher } from '@/lib/utils';
import Spinner from '../ui/spinner';
import useSWR from 'swr';
import { CustomTooltip } from './custom-tooltip';

const UserButton = () => {
  const { getUser: getKindeUser } = useKindeBrowserClient();
  const kindeUser = getKindeUser();

  const { data: user, isLoading, error } = useSWR('/users', fetcher);

  if (isLoading) return <Spinner size={24} />;

  if (error) {
    return (
      <CustomTooltip content={error.message || 'Beklenmedik sunucu hatası'}>
        <AlertCircle size={18} className='text-destructive' />
      </CustomTooltip>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' className='relative h-8 w-8 rounded-full'>
          <Avatar className='h-8 w-8'>
            <AvatarImage
              src={user?.profile_picture || '/image/avatar.svg'}
              alt={kindeUser?.username || kindeUser?.given_name || 'Avatar'}
            />
            <AvatarFallback>
              {kindeUser?.username || kindeUser?.given_name || 'Kullanıcı'}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-56' align='end' forceMount>
        <DropdownMenuLabel className='font-normal'>
          <div className='flex flex-col space-y-1'>
            <p className='text-sm font-medium leading-none'>
              {kindeUser?.username || kindeUser?.given_name}
            </p>
            <p className='text-xs leading-none text-muted-foreground'>
              {kindeUser?.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <LogoutLink className='text-destructive'>
            <LogOut size={14} /> Çıkış yap
          </LogoutLink>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserButton;
