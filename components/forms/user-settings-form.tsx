'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';

export default function UserSettingsForm() {
  const { getUser } = useKindeBrowserClient();

  const user = getUser();
  const [emails, setEmails] = useState([user?.email]);

  const addEmail = (newEmail: any) => {
    setEmails([...emails, newEmail]);
  };

  const removeEmail = (emailToRemove: any) => {
    setEmails(emails.filter((email) => email !== emailToRemove));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Kullanıcı Ayarları</CardTitle>
        <CardDescription>
          Hesap bilgilerinizi ve tercihlerinizi yönetin
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue='profile'>
          <TabsList className='grid w-full grid-cols-3 mb-8'>
            <TabsTrigger value='profile'>Profil</TabsTrigger>
            <TabsTrigger value='account'>Hesap</TabsTrigger>
            <TabsTrigger value='security'>Güvenlik</TabsTrigger>
          </TabsList>
          <TabsContent value='profile'>
            <form className='space-y-4 mt-8'>
              <div className='flex items-center space-x-4'>
                <Avatar className='h-24 w-24'>
                  <AvatarImage
                    src={user?.picture || '/image/avatar.svg'}
                    alt='Profil fotoğrafı'
                  />
                  <AvatarFallback>
                    {user?.given_name?.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <Label>
                  Profil fotoğrafını değiştir
                  <Input
                    type='file'
                    className='mt-2 border-dashed cursor-pointer'
                  />
                </Label>
              </div>
              <div className='grid w-full items-center gap-1.5'>
                <Label htmlFor='name'>İsim</Label>
                <Input
                  className='w-[300px]'
                  id='name'
                  placeholder='İsminizi girin'
                  value={user?.given_name || ''}
                />
              </div>
              <Button type='submit'>Kaydet</Button>
            </form>
          </TabsContent>
          <TabsContent value='account'>
            <form className='space-y-4'>
              <div>
                <h3 className='text-lg font-medium'>E-posta Adresleri</h3>
                {emails.map((email, index) => (
                  <div key={index} className='flex items-center space-x-2 mt-2'>
                    <Input className='w-[300px]' value={email} readOnly />
                    <Button
                      variant='destructive'
                      onClick={() => removeEmail(email)}
                    >
                      Sil
                    </Button>
                  </div>
                ))}
                <div className='flex items-center space-x-2 mt-2'>
                  <Input
                    className='w-[300px]'
                    placeholder='Yeni e-posta ekle'
                  />
                  <Button onClick={() => addEmail('new@example.com')}>
                    Ekle
                  </Button>
                </div>
              </div>
            </form>
          </TabsContent>
          <TabsContent value='security'>
            <form className='space-y-4'>
              <div className='grid w-full items-center gap-1.5'>
                <Label htmlFor='current-password'>Mevcut Şifre</Label>
                <Input
                  className='w-[300px]'
                  id='current-password'
                  type='password'
                  placeholder='Mevcut şifrenizi girin'
                />
              </div>
              <div className='grid w-full items-center gap-1.5'>
                <Label htmlFor='new-password'>Yeni Şifre</Label>
                <Input
                  className='w-[300px]'
                  id='new-password'
                  type='password'
                  placeholder='Yeni şifrenizi girin'
                />
              </div>
              <div className='grid w-full items-center gap-1.5'>
                <Label htmlFor='confirm-password'>Yeni Şifreyi Onayla</Label>
                <Input
                  className='w-[300px]'
                  id='confirm-password'
                  type='password'
                  placeholder='Yeni şifrenizi onaylayın'
                />
              </div>
              <Button>Şifreyi Değiştir</Button>
            </form>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
