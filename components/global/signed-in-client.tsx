'use client';

import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';

type SignedInClientProps = {
  children: React.ReactNode;
};

const SignedInClient = ({ children }: SignedInClientProps) => {
  const { isAuthenticated } = useKindeBrowserClient();

  if (isAuthenticated) {
    return children;
  } else {
    return null;
  }
};

export default SignedInClient;
