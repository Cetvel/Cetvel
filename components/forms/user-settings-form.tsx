'use client';

import React, { useState, useEffect } from 'react';
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
import { X, Plus, Check, Edit2, Loader2 } from 'lucide-react';
import { useUser } from '@/context/user-context';
import useSWR, { mutate } from 'swr';
import { Alert, AlertDescription } from '../ui/alert';

const settingsSchema = z
  .object({
    username: z.string().min(1, 'Kullanıcı adı zorunludur'),
    emails: z
      .array(
        z.object({
          value: z.string().email('Geçerli bir e-posta adresi giriniz'),
          isPrimary: z.boolean().default(false),
        })
      )
      .min(1, 'En az bir e-posta adresi gereklidir'),
    currentPassword: z.string().optional(),
    newPassword: z.string().optional(),
    confirmPassword: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.newPassword && !data.currentPassword) {
        return false;
      }
      return true;
    },
    {
      message: 'Yeni şifre belirlemek için mevcut şifrenizi girmelisiniz',
      path: ['currentPassword'],
    }
  )
  .refine(
    (data) => {
      if (data.newPassword !== data.confirmPassword) {
        return false;
      }
      return true;
    },
    {
      message: 'Şifreler eşleşmiyor',
      path: ['confirmPassword'],
    }
  );

type SettingsFormData = z.infer<typeof settingsSchema>;

export default function UserSettingsForm() {
  const [isEditingUsername, setIsEditingUsername] = useState(false);
  const [initialDataLoaded, setInitialDataLoaded] = useState(false);

  const {
    data: emailsData,
    isLoading: isEmailsLoading,
    error: emailsError,
  } = useSWR('/settings/user/email', fetcher);
  const { user, isUserLoading, isUserError } = useUser();

  const form = useForm<SettingsFormData>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      username: '',
      emails: [],
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  const { fields, append, remove, replace } = useFieldArray({
    control: form.control,
    name: 'emails',
  });

  useEffect(() => {
    if (
      !initialDataLoaded &&
      !isUserLoading &&
      !isEmailsLoading &&
      user &&
      emailsData
    ) {
      const formattedEmails = emailsData.map((email: any) => ({
        value: email.value,
        isPrimary: email.isPrimary,
        kindeId: email.kindeId,
      }));

      form.reset({
        username: user.name,
        emails: formattedEmails,
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });

      setInitialDataLoaded(true);
    }
  }, [
    user,
    emailsData,
    isUserLoading,
    isEmailsLoading,
    form,
    initialDataLoaded,
  ]);

  const getFormChanges = (): boolean => {
    // Return type explicitly set to boolean
    if (!initialDataLoaded) return false;

    const currentValues = form.getValues();
    const isDirty =
      user?.name !== currentValues.username ||
      Boolean(
        currentValues.currentPassword ||
          currentValues.newPassword ||
          currentValues.confirmPassword
      ) ||
      JSON.stringify(
        emailsData?.map((email: any) => ({
          value: email.value,
          isPrimary: email.isPrimary,
        }))
      ) !== JSON.stringify(currentValues.emails);

    return isDirty;
  };

  const onSubmit = async (data: SettingsFormData) => {
    try {
      await axiosInstance.put('/settings/user', {
        username: data.username,
      });

      const newEmails = data.emails || [];
      const addedEmails = newEmails.filter((email) => email.value);

      for (const email of addedEmails) {
        await axiosInstance.post('/settings/user/email', {
          email: email.value,
        });
      }

      const primaryEmail = newEmails.find((email) => email.isPrimary);
      if (primaryEmail) {
        await axiosInstance.put('/settings/user/email', {
          email: primaryEmail.value,
        });
      }

      if (data.newPassword && data.currentPassword) {
        await axiosInstance.put('/settings/user/password', {
          currentPassword: data.currentPassword,
          newPassword: data.newPassword,
        });

        form.setValue('currentPassword', '');
        form.setValue('newPassword', '');
        form.setValue('confirmPassword', '');
      }

      toast.success('İşlem başarılı', {
        description: 'Ayarlarınız başarıyla güncellendi',
      });

      setIsEditingUsername(false);
      mutate('/users');
      mutate('/settings/user/email');
    } catch (error: any) {
      toast.error('İşlem sırasında bir hata oluştu', {
        description:
          error.response?.data?.message || 'Beklenmedik bir hata oluştu',
      });
    }
  };

  const setPrimaryEmail = async (index: number) => {
    try {
      const emailToUpdate = fields[index];
      if (!emailToUpdate?.value) return;

      await axiosInstance.put('/settings/user/email', {
        email: emailToUpdate.value,
      });

      const currentEmails = form.getValues('emails');
      const updatedEmails = currentEmails?.map((email, idx) => ({
        ...email,
        isPrimary: idx === index,
      }));
      form.setValue('emails', updatedEmails || [], { shouldDirty: true });

      toast.success('İşlem başarılı', {
        description: 'Primary email başarıyla güncellendi',
      });

      mutate('/settings/user/email');
    } catch (error: any) {
      toast.error('İşlem sırasında bir hata oluştu', {
        description:
          error.response?.data?.message ||
          'Primary email güncellenirken bir hata oluştu',
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

  if (isUserLoading || isEmailsLoading) {
    return (
      <Card>
        <CardContent className='flex items-center justify-center h-96'>
          <Loader2 className='h-8 w-8 animate-spin' />
        </CardContent>
      </Card>
    );
  }

  if (isUserError || emailsError) {
    return (
      <Card>
        <CardContent className='flex items-center justify-center h-96 text-red-500'>
          Veriler yüklenirken bir hata oluştu. Lütfen sayfayı yenileyin.
        </CardContent>
      </Card>
    );
  }

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
                        disabled={form.formState.isSubmitting}
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
                        name={`emails.${index}.value`}
                        placeholder='E-posta adresinizi girin'
                        disabled={form.formState.isSubmitting}
                      />
                    </div>
                    <div className='flex gap-2'>
                      <Button
                        type='button'
                        variant='outline'
                        size='icon'
                        onClick={() => setPrimaryEmail(index)}
                        disabled={
                          form.formState.isSubmitting || field.isPrimary
                        }
                        className={field.isPrimary ? 'bg-green-100' : ''}
                      >
                        <Check
                          className={`h-4 w-4 ${
                            field.isPrimary ? 'text-green-500' : 'text-gray-400'
                          }`}
                        />
                      </Button>
                      {fields.length > 1 && (
                        <Button
                          type='button'
                          variant='outline'
                          size='icon'
                          onClick={() => remove(index)}
                          disabled={form.formState.isSubmitting}
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
                  onClick={() => append({ value: '', isPrimary: false })}
                  className='flex items-center gap-2'
                  disabled={form.formState.isSubmitting}
                >
                  <Plus className='h-4 w-4' />
                  <span>Yeni E-posta Ekle</span>
                </Button>
              </div>
            </div>

            <div className='space-y-4'>
              <h3 className='text-lg font-medium'>Şifre Değiştir</h3>
              <Alert>
                <AlertDescription>
                  Eğer Google veya Facebook ile giriş yaptıysanız ilk önce
                  e-posta adresi eklemeniz gerekmektedir. Ardından &apos;Şifremi
                  Unuttum&apos; sayfasına giderek şifrenizi değiştirebilirsiniz.
                </AlertDescription>
              </Alert>
              <div className='space-y-4 max-w-md'>
                <CustomFormField
                  fieldType={FormFieldType.PASSWORD}
                  control={form.control}
                  name='currentPassword'
                  placeholder='Mevcut şifrenizi girin'
                  disabled={form.formState.isSubmitting}
                />
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
                  <CustomFormField
                    fieldType={FormFieldType.PASSWORD}
                    control={form.control}
                    name='newPassword'
                    placeholder='Yeni şifrenizi girin'
                    disabled={form.formState.isSubmitting}
                  />
                  <CustomFormField
                    fieldType={FormFieldType.PASSWORD}
                    control={form.control}
                    name='confirmPassword'
                    placeholder='Yeni şifrenizi onaylayın'
                    disabled={form.formState.isSubmitting}
                  />
                </div>
              </div>
            </div>

            <UnsavedChangesNotification
              form={form}
              hasUnsavedChanges={getFormChanges()}
            />
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
