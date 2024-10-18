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
          {navigationItems.map((item, index) => (
            <NavigationMenuItem key={index}>
              <Link href={item.href} passHref legacyBehavior>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  {item.title}
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
      {children}
    </main>
  );
}
