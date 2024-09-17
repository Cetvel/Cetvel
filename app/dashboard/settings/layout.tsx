import PageHeader from '@/components/global/page-header';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import Link from 'next/link';

const navigationItems: { title: string; href: string }[] = [
  {
    title: 'Hesap',
    href: '/dashboard/settings',
  },
  {
    title: 'Bildirimler',
    href: '/dashboard/settings/notifications',
  },
  {
    title: 'Tercihler',
    href: '/dashboard/settings/preferences',
  },
];

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      <PageHeader title='Ayarlar' />
      <NavigationMenu className='mb-6'>
        <NavigationMenuList>
          <NavigationMenuItem>
            <Link href='/dashboard/settings' legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Hesap
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link
              href='/dashboard/settings/preferences'
              legacyBehavior
              passHref
            >
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Tercihler
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href='/dashboard/settings/payment' legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Abonelik
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      {children}
    </main>
  );
}
