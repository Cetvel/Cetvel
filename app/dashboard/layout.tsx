import Sidebar from '@/components/global/sidebar';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Panel',
  description: 'Cetvel',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className='min-h-screen'>
      <Sidebar />
      <div className='xl:ml-64 p-2 xl:p-6 z-[30] backdrop-blur-2xl min-h-screen bg-base-100/40'>
        {children}
      </div>
    </main>
  );
}
