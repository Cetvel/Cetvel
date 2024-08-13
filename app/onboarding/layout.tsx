import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (auth().sessionClaims?.metadata?.onboardingComplete === true) {
    redirect("/");
  }

  return (
    <main className="w-full min-h-screen grid place-items-center">
      {children}
    </main>
  );
}
