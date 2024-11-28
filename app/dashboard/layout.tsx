import PageHeader from '@/components/global/page-header';
import Sidebar from '@/components/global/sidebar';
import UserContextProvider from '@/features/users/contexts/user-context';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Panel',
  description: 'Mihver',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isAuthenticated } = getKindeServerSession();

  return (await isAuthenticated()) ? (
    <UserContextProvider>
      <main className='h-screen'>
        <Sidebar />
        <div className='xl:ml-64 relative h-screen overflow-y-auto bg-base-100/40'>
          <div className='p-2 xl:p-6 relative z-10 backdrop-blur-xl h-screen'>
            {children}
          </div>
        </div>
      </main>
    </UserContextProvider>
  ) : (
    redirect('/api/auth/login')
  );
}
