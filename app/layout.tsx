import type { Metadata } from 'next';
import { DM_Sans } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/providers/theme-provider';
import ModalProvider from '@/providers/modal-provider';
import { trTR } from '@clerk/localizations';
import { ClerkProvider } from '@clerk/nextjs';
import { ConvexClientProvider } from '../providers/convex-client-provider';
import { Toaster } from '@/components/ui/sonner';
import { GoogleTagManager } from '@next/third-parties/google';

const dm_sans = DM_Sans({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Cetvel - Zamanı yönet, başarıyı yakala!',
  description:
    'Cetvel, Ders çalışma sürecinizi kolaylaştıran ve akademik başarınızı optimize eden güçlü bir yardımcıdır.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      localization={trTR}
      appearance={{
        variables: {
          colorPrimary: '#6366f1',
          borderRadius: '0.5rem',
        },
      }}
    >
      <html
        lang='tr'
        className='antialised scroll-smooth'
        suppressHydrationWarning
      >
        <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM!} />
        <body className={dm_sans.className}>
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${process.env.NEXT_PUBLIC_GTM!}`}
              height='0'
              width='0'
              style={{
                display: 'none',
                visibility: 'hidden',
              }}
            ></iframe>
          </noscript>
          <ConvexClientProvider>
            <ThemeProvider
              attribute='class'
              defaultTheme='system'
              enableSystem
              disableTransitionOnChange
            >
              <ModalProvider>{children}</ModalProvider>
              <Toaster />
            </ThemeProvider>
          </ConvexClientProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
