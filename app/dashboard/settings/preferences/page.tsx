'use client';

import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { useTheme } from 'next-themes';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Moon, Sun } from 'lucide-react';
import { Input } from '@/components/ui/input';

const PreferencesPage = () => {
  const { setTheme } = useTheme();

  return (
    <Card className='w-full'>
      <CardHeader>
        <CardTitle>Tercihler</CardTitle>
        <CardDescription>Uygulama deneyiminizi özelleştirin</CardDescription>
      </CardHeader>
      <CardContent className='space-y-6'>
        <div className='form-line'>
          <Label htmlFor='theme'>Tema</Label>
          <div className='max-w-lg'>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant='outline' size='icon'>
                  <Sun className='h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' />
                  <Moon className='absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' />
                  <span className='sr-only'>Temayı değiştir</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align='end'>
                <DropdownMenuItem onClick={() => setTheme('light')}>
                  Açık
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme('dark')}>
                  Koyu
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme('system')}>
                  Sistem
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className='form-line'>
          <Label htmlFor='notifications'>Bildirimleri Etkinleştir</Label>
          <Switch id='notifications' />
        </div>
        <div className='form-line'>
          <Label htmlFor='notifications'>Görev Hatırlatıcıları</Label>
          <Switch id='notifications' />
        </div>
        <div className='form-line'>
          <Label htmlFor='notifications'>Görev Hatırlatma Sıklığı</Label>
          <div className='max-w-lg flex gap-2 items-center justify-center whitespace-nowrap'>
            <Input type='number' id='notifications' />
            <span>Saatte bir</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PreferencesPage;
