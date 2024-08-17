import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/providers/theme-provider";
import ModalProvider from "@/providers/modal-provider";
import { trTR } from "@clerk/localizations";
import { dark } from "@clerk/themes";
import { ClerkProvider } from "@clerk/nextjs";

const dm_sans = DM_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Cetvel - Zamanı yönet, başarıyı yakala!",
  description:
    "Cetvel, Ders çalışma sürecinizi kolaylaştıran ve akademik başarınızı optimize eden güçlü bir yardımcıdır.",
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
          colorPrimary: "#6366f1",
          borderRadius: "0.5rem",
        },
        signIn: {
          baseTheme: dark,
        },
        signUp: {
          baseTheme: dark,
        },
      }}
    >
      <html lang="tr" className="antialised scroll-smooth">
        <body className={dm_sans.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <ModalProvider>{children}</ModalProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}