'use client';

import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';

type SignedOutClientProps = {
  children: React.ReactNode;
};

const SignedOutClient = ({ children }: SignedOutClientProps) => {
  const { isAuthenticated } = useKindeBrowserClient();

  if (!isAuthenticated) {
    return children;
  } else {
    return null;
  }
};

export default SignedOutClient;
