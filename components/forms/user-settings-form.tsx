'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
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
import { zodResolver } from '@hookform/resolvers/zod';
import { axiosInstance } from '@/lib/utils';
import { toast } from 'sonner';
import Spinner from '../ui/spinner';
import ImageUploader from '../global/image-uploader';

const profileSchema = z.object({
  username: z.string().min(2, 'Kullanıcı adı en az 2 karakter olmalıdır'),
  picture: z.string().optional(),
});

const emailSchema = z.object({
  email: z
    .string()
    .min(1, 'Email adresi gereklidir')
    .email('Geçerli bir e-posta adresi giriniz'),
});

const passwordSchema = z
  .object({
    currentPassword: z.string().min(6, 'Şifre en az 6 karakter olmalıdır'),
    newPassword: z.string().min(6, 'Şifre en az 6 karakter olmalıdır'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Şifreler eşleşmiyor',
    path: ['confirmPassword'],
  });

type ProfileFormData = z.infer<typeof profileSchema>;
type EmailFormData = z.infer<typeof emailSchema>;
type PasswordFormData = z.infer<typeof passwordSchema>;

export default function UserSettingsForm() {
  const { getUser } = useKindeBrowserClient();
  const user = getUser();

  const profileForm = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      username: user?.username || '',
      picture: user?.picture || '',
    },
  });

  const emailForm = useForm<EmailFormData>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: user?.email || '',
    },
  });

  /* const passwordForm = useForm<PasswordFormData>({
    resolver: zodResolver(passwordSchema),
  }); */

  const onProfileSubmit = async (data: ProfileFormData) => {
    try {
      await axiosInstance.put('/settings/user', data);
    } catch (error) {
      console.error('Profil güncellenirken hata:', error);
    }
  };

  const onEmailSubmit = async (data: EmailFormData) => {
    try {
      await axiosInstance.put('/settings/user/email', data);
      console.log('Email güncellendi:', data);
      toast.success('İşlem başarıyla gerçekleşti', {
        description: 'E-posta adresiniz başarıyla güncellendi',
      });
    } catch (error: any) {
      toast.error('İşlem sırasında bir hata oluştu', {
        description:
          error.response?.data?.message ||
          'E-posta güncellenirken bir hata oluştu',
      });
      console.error('Email güncellenirken hata:', error);
    }
  };

  /* const onPasswordSubmit = async (data: PasswordFormData) => {
    try {
      console.log('Şifre güncelleniyor');
    } catch (error) {
      console.error('Şifre güncellenirken hata:', error);
    }
  }; */

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
          <TabsList className='grid w-full grid-cols-2 mb-8'>
            <TabsTrigger value='profile'>Profil</TabsTrigger>
            <TabsTrigger value='account'>Hesap</TabsTrigger>
            {/* <TabsTrigger value='security'>Güvenlik</TabsTrigger> */}
          </TabsList>

          <TabsContent value='profile'>
            <form
              onSubmit={profileForm.handleSubmit(onProfileSubmit)}
              className='space-y-4 mt-8'
            >
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
                  <ImageUploader
                    label='Profil fotoğrafını değiştir'
                    apiEndpoint='/picture/profile'
                  />
                </Label>
              </div>
              <div className='grid w-full items-center gap-1.5'>
                <Label htmlFor='username'>Kullanıcı adı</Label>
                <Input
                  className='w-[300px]'
                  id='username'
                  placeholder='Kullanıcı adınızı girin'
                  {...profileForm.register('username')}
                />
                {profileForm.formState.errors.username && (
                  <p className='text-red-500 text-sm'>
                    {profileForm.formState.errors.username.message}
                  </p>
                )}
              </div>
              <Button
                type='submit'
                disabled={profileForm.formState.isSubmitting}
              >
                {profileForm.formState.isSubmitting && <Spinner />}
                Güncelle
              </Button>
            </form>
          </TabsContent>

          <TabsContent value='account'>
            <form
              onSubmit={emailForm.handleSubmit(onEmailSubmit)}
              className='space-y-4'
            >
              <div>
                <h3 className='text-lg font-medium'>E-posta Adresi</h3>
                <p className='text-muted-foreground text-sm mb-6'>
                  {user?.email} adresiyle giriş yapıyorsunuz. E-posta adresinizi
                  güncellemek için aşağıdaki alana yeni e-posta adresinizi
                  girin.
                </p>
                <div className='mt-2'>
                  <div className='w-[300px]'>
                    <Input
                      type='email'
                      placeholder='E-posta adresinizi girin'
                      {...emailForm.register('email')}
                    />
                    {emailForm.formState.errors.email && (
                      <p className='text-red-500 text-sm'>
                        {emailForm.formState.errors.email.message}
                      </p>
                    )}
                  </div>
                  <Button
                    type='submit'
                    disabled={emailForm.formState.isSubmitting}
                    className='mt-2'
                  >
                    {emailForm.formState.isSubmitting && <Spinner />}
                    Güncelle
                  </Button>
                </div>
              </div>
            </form>
          </TabsContent>

          {/* <TabsContent value='security'>
            <form
              onSubmit={passwordForm.handleSubmit(onPasswordSubmit)}
              className='space-y-4'
            >
              <div className='grid w-full items-center gap-1.5'>
                <Label htmlFor='current-password'>Mevcut Şifre</Label>
                <Input
                  className='w-[300px]'
                  id='current-password'
                  type='password'
                  placeholder='Mevcut şifrenizi girin'
                  {...passwordForm.register('currentPassword')}
                />
                {passwordForm.formState.errors.currentPassword && (
                  <p className='text-red-500 text-sm'>
                    {passwordForm.formState.errors.currentPassword.message}
                  </p>
                )}
              </div>
              <div className='grid w-full items-center gap-1.5'>
                <Label htmlFor='new-password'>Yeni Şifre</Label>
                <Input
                  className='w-[300px]'
                  id='new-password'
                  type='password'
                  placeholder='Yeni şifrenizi girin'
                  {...passwordForm.register('newPassword')}
                />
                {passwordForm.formState.errors.newPassword && (
                  <p className='text-red-500 text-sm'>
                    {passwordForm.formState.errors.newPassword.message}
                  </p>
                )}
              </div>
              <div className='grid w-full items-center gap-1.5'>
                <Label htmlFor='confirm-password'>Yeni Şifreyi Onayla</Label>
                <Input
                  className='w-[300px]'
                  id='confirm-password'
                  type='password'
                  placeholder='Yeni şifrenizi onaylayın'
                  {...passwordForm.register('confirmPassword')}
                />
                {passwordForm.formState.errors.confirmPassword && (
                  <p className='text-red-500 text-sm'>
                    {passwordForm.formState.errors.confirmPassword.message}
                  </p>
                )}
              </div>
              <Button
                type='submit'
                disabled={passwordForm.formState.isSubmitting}
              >
                {passwordForm.formState.isSubmitting
                  ? 'Değiştiriliyor...'
                  : 'Şifreyi Değiştir'}
              </Button>
            </form>
          </TabsContent> */}
        </Tabs>
      </CardContent>
    </Card>
  );
}
