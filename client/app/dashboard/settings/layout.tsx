import PageHeader from "@/components/global/page-header";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
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
      <div className="flex justify-center mb-6 bg-base-100 rounded-xl border-card p-2">
        <NavigationMenu className="gap-4">
          {navigationItems.map((item) => (
            <NavigationMenuItem key={item.title}>
              <Link href={item.href} passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  {item.title}
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          ))}
        </NavigationMenu>
      </div>
      <div className="w-full flex items-center justify-center">{children}</div>
    </main>
  );
}
