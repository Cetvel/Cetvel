import Sidebar from '@/components/global/sidebar';
import UserContextProvider from '@/context/user-context';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Panel',
  description: 'Cetvel',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isAuthenticated } = getKindeServerSession();

  return (await isAuthenticated()) ? (
    <UserContextProvider>
      <main className='min-h-screen'>
        <Sidebar />
        <div className='xl:ml-64 p-2 xl:p-6 z-[30] backdrop-blur-2xl min-h-screen bg-base-100/40'>
          {children}
        </div>
      </main>
    </UserContextProvider>
  ) : (
    redirect('/api/auth/login')
  );
}
