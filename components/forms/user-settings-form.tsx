'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useModal } from '@/providers/modal-provider';
import Modal from '../global/modal';
import ProfilePhotoUpload from './profile-photo-form';
import SubmitButton from './ui/submit-button';

export default function UserSettingsForm() {
  const [emails, setEmails] = useState(['user@example.com']);
  const { setOpen } = useModal();

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
          <TabsList className='grid w-full grid-cols-3'>
            <TabsTrigger value='profile'>Profil</TabsTrigger>
            <TabsTrigger value='account'>Hesap</TabsTrigger>
            <TabsTrigger value='security'>Güvenlik</TabsTrigger>
          </TabsList>
          <TabsContent value='profile'>
            <form className='space-y-4 mt-8'>
              <div className='flex items-center space-x-4'>
                <Avatar className='h-24 w-24'>
                  <AvatarImage src='/image/avatar.svg' alt='@shadcn' />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <Button
                  type='button'
                  onClick={() =>
                    setOpen(
                      <Modal title='Profil Fotoğrafını Değiştir'>
                        <p>ehu</p>
                      </Modal>
                    )
                  }
                  variant='secondary'
                >
                  Profil Fotoğrafını Değiştir
                </Button>
              </div>
              <div className='grid w-full items-center gap-1.5'>
                <Label htmlFor='name'>İsim</Label>
                <Input
                  className='w-[300px]'
                  id='name'
                  placeholder='İsminizi girin'
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
              <Button>Hesap Ayarlarını Kaydet</Button>
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
                />
              </div>
              <div className='grid w-full items-center gap-1.5'>
                <Label htmlFor='new-password'>Yeni Şifre</Label>
                <Input
                  className='w-[300px]'
                  id='new-password'
                  type='password'
                />
              </div>
              <div className='grid w-full items-center gap-1.5'>
                <Label htmlFor='confirm-password'>Yeni Şifreyi Onayla</Label>
                <Input
                  className='w-[300px]'
                  id='confirm-password'
                  type='password'
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
