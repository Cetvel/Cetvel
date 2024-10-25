'use client';

import React, { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import { zodResolver } from '@hookform/resolvers/zod';
import { axiosInstance, fetcher } from '@/lib/utils';
import { toast } from 'sonner';
import CustomFormField, { FormFieldType } from '../ui/custom-form-field';
import UnsavedChangesNotification from './ui/unsaved-changes-notification';
import { Form } from '../ui/form';
import { ImageUploader } from '../global/image-uploader';
import { X, Plus, Check, Edit2 } from 'lucide-react';
import { useUser } from '@/context/user-context';
import { mutate } from 'swr';

const settingsSchema = z
  .object({
    username: z.string().min(2, 'Kullanıcı adı en az 2 karakter olmalıdır'),
    emails: z
      .array(
        z.object({
          email: z.string().email('Geçerli bir e-posta adresi giriniz'),
          isPrimary: z.boolean().default(false),
        })
      )
      .min(1, 'En az bir email adresi gereklidir'),
    currentPassword: z.string().optional(),
    newPassword: z
      .string()
      .min(6, 'Şifre en az 6 karakter olmalıdır')
      .optional(),
    confirmPassword: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.newPassword && !data.currentPassword) {
        return false;
      }
      if (data.newPassword !== data.confirmPassword) {
        return false;
      }
      return true;
    },
    {
      message: 'Şifreler eşleşmiyor veya mevcut şifre gerekli',
      path: ['confirmPassword'],
    }
  );

type SettingsFormData = z.infer<typeof settingsSchema>;

export default function UserSettingsForm() {
  const [isEditingUsername, setIsEditingUsername] = useState(false);
  const { user, kindeUser } = useUser();

  const form = useForm<SettingsFormData>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      username: kindeUser?.username || '',
      emails: [{ email: kindeUser?.email || '', isPrimary: true }],
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'emails',
  });

  const onSubmit = async (data: SettingsFormData) => {
    try {
      await axiosInstance.put('/settings/user', {
        username: data.username,
        emails: data.emails,
      });

      if (data.newPassword && data.currentPassword) {
        await axiosInstance.put('/settings/user/password', {
          currentPassword: data.currentPassword,
          newPassword: data.newPassword,
        });
      }

      toast.success('İşlem başarılı', {
        description: 'Ayarlarınız başarıyla güncellendi',
      });

      setIsEditingUsername(false);
      mutate('/users');
    } catch (error: any) {
      toast.error('İşlem sırasında bir hata oluştu', {
        description:
          error.response?.data?.message || 'Beklenmedik bir hata oluştu',
      });
    }
  };

  const onProfilePictureChange = async (url: string) => {
    try {
      await axiosInstance.put('/picture/profile', { url });
      toast.success('İşlem başarılı', {
        description: 'Profil resminiz başarıyla güncellendi',
      });
      mutate('/users');
    } catch (error: any) {
      toast.error('İşlem sırasında bir hata oluştu', {
        description:
          error.response?.data?.message ||
          'Profil resmi güncellenirken bir hata oluştu',
      });
    }
  };

  const setPrimaryEmail = (index: number) => {
    const currentEmails = form.getValues('emails');
    const updatedEmails = currentEmails.map((email, idx) => ({
      ...email,
      isPrimary: idx === index,
    }));
    form.setValue('emails', updatedEmails);
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
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='gap-8 grid grid-cols-1 lg:grid-cols-3'
          >
            <div className='space-y-4'>
              <h3 className='text-lg font-medium'>Profil Bilgileri</h3>
              <div className='flex flex-col md:flex-row items-start md:items-center gap-4'>
                <ImageUploader
                  onChange={onProfilePictureChange}
                  value={user?.profile_picture || '/image/avatar.svg'}
                  width={100}
                  height={100}
                  cropConfig={{
                    aspect: 1,
                    cropShape: 'round',
                    minWidth: 100,
                    minHeight: 100,
                  }}
                  maxSize={2}
                  placeholder='Düzenle'
                />
                <div className='w-full md:w-[250px]'>
                  {isEditingUsername ? (
                    <CustomFormField
                      fieldType={FormFieldType.INPUT}
                      label='Kullanıcı Adı'
                      control={form.control}
                      name='username'
                      placeholder='Kullanıcı adınızı girin'
                    />
                  ) : (
                    <div className='flex items-center justify-between'>
                      <div>
                        <Label>Kullanıcı Adı</Label>
                        <p className='mt-1 text-sm'>
                          {form.getValues('username')}
                        </p>
                      </div>
                      <Button
                        type='button'
                        variant='ghost'
                        size='icon'
                        onClick={() => setIsEditingUsername(true)}
                      >
                        <Edit2 className='h-4 w-4' />
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className='space-y-4'>
              <h3 className='text-lg font-medium'>E-posta Adresleri</h3>
              <div className='space-y-4'>
                {fields.map((field, index) => (
                  <div
                    key={field.id}
                    className='flex flex-col sm:flex-row items-start sm:items-center gap-2'
                  >
                    <div className='w-full sm:w-[300px]'>
                      <CustomFormField
                        fieldType={FormFieldType.INPUT}
                        control={form.control}
                        name={`emails.${index}.email`}
                        placeholder='E-posta adresinizi girin'
                      />
                    </div>
                    <div className='flex gap-2'>
                      <Button
                        type='button'
                        variant='outline'
                        size='icon'
                        onClick={() => setPrimaryEmail(index)}
                        className={field.isPrimary ? 'bg-green-100' : ''}
                      >
                        <Check
                          className={`h-4 w-4 ${field.isPrimary ? 'text-green-500' : 'text-gray-400'}`}
                        />
                      </Button>
                      {fields.length > 1 && (
                        <Button
                          type='button'
                          variant='outline'
                          size='icon'
                          onClick={() => remove(index)}
                        >
                          <X className='h-4 w-4' />
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
                <Button
                  type='button'
                  variant='outline'
                  size='sm'
                  onClick={() => append({ email: '', isPrimary: false })}
                  className='flex items-center gap-2'
                >
                  <Plus className='h-4 w-4' />
                  <span>Yeni E-posta Ekle</span>
                </Button>
              </div>
            </div>

            <div className='space-y-4'>
              <h3 className='text-lg font-medium'>Şifre Değiştir</h3>
              <div className='space-y-4 max-w-md'>
                <CustomFormField
                  fieldType={FormFieldType.PASSWORD}
                  control={form.control}
                  name='currentPassword'
                  placeholder='Mevcut şifrenizi girin'
                />
                <CustomFormField
                  fieldType={FormFieldType.PASSWORD}
                  control={form.control}
                  name='newPassword'
                  placeholder='Yeni şifrenizi girin'
                />
                <CustomFormField
                  fieldType={FormFieldType.PASSWORD}
                  control={form.control}
                  name='confirmPassword'
                  placeholder='Yeni şifrenizi onaylayın'
                />
              </div>
            </div>

            <UnsavedChangesNotification form={form} />
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
