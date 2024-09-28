import type { Metadata } from 'next';
import { DM_Sans } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/providers/theme-provider';
import ModalProvider from '@/providers/modal-provider';
import { trTR } from '@clerk/localizations';
import { ClerkProvider } from '@clerk/nextjs';
import { ConvexClientProvider } from '../providers/convex-client-provider';
import { Toaster } from '@/components/ui/sonner';
import { GoogleAnalytics } from '@next/third-parties/google';

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
        <body className={dm_sans.className}>
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
        <GoogleAnalytics gaId='G-S2VDTGJF87' />
      </html>
    </ClerkProvider>
  );
}
