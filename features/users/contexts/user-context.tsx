'use client';

import { fetcher } from '@/lib/utils';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { KindeUser } from '@kinde-oss/kinde-auth-nextjs/types';
import { createContext, useContext } from 'react';
import useSWR from 'swr';

const UserContext = createContext<{
  kindeUser: KindeUser<Record<string, string>> | null;
  user: User | null;
  isUserLoading: boolean;
  isUserError: {
    message: string;
  } | null;
}>({
  kindeUser: null,
  user: null,
  isUserLoading: true,
  isUserError: null,
});

const UserContextProvider = ({ children }: { children: React.ReactNode }) => {
  const {
    data: user,
    isLoading: isUserLoading,
    error: isUserError,
  } = useSWR('/users', fetcher);
  const { getUser } = useKindeBrowserClient();
  const kindeUser = getUser();

  return (
    <UserContext.Provider
      value={{ kindeUser, user, isUserLoading, isUserError }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserContextProvider');
  }
  return context;
};

export default UserContextProvider;
