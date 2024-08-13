import PageHeader from "@/components/global/page-header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";

const navigationItems: { title: string; href: string }[] = [
  {
    title: "Hesap",
    href: "/dashboard/settings",
  },
  {
    title: "Bildirimler",
    href: "/dashboard/settings/notifications",
  },
  {
    title: "Tercihler",
    href: "/dashboard/settings/preferences",
  },
  {
    title: "Ödeme Bilgileri",
    href: "/dashboard/settings/payment",
  },
];

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      <PageHeader title="Ayarlar" />
      <Tabs defaultValue="account">
        <TabsList className="w-full grid grid-cols-4 mb-6">
          <TabsTrigger value="account" defaultChecked>
            Hesap
          </TabsTrigger>
          <TabsTrigger value="notifications">Bildirimler</TabsTrigger>
          <TabsTrigger value="preferences">Tercihler</TabsTrigger>
          <TabsTrigger value="payment">Ödeme Bilgileri</TabsTrigger>
        </TabsList>
        {children}
      </Tabs>
    </main>
  );
}
