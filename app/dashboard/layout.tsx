import PageHeader from '@/components/global/page-header';
import Sidebar from '@/components/global/sidebar';
import UserContextProvider from '@/features/users/contexts/user-context';
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
      <main className='h-screen'>
        <Sidebar />
        <div className='xl:ml-64 relative h-screen overflow-y-auto bg-base-100/40'>
          <div className='sticky top-0 z-50 backdrop-blur-2xl px-6 bg-white border-b'>
            <PageHeader title='Panel' />
          </div>
          <div className='p-2 xl:p-6 relative z-10 backdrop-blur-xl'>
            {children}
          </div>
        </div>
      </main>
    </UserContextProvider>
  ) : (
    redirect('/api/auth/login')
  );
}
