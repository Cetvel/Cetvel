'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import CustomFormField, {
  FormFieldType,
} from '@/components/ui/custom-form-field';
import SubmitButton from '@/components/forms/ui/submit-button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';

const ChangePasswordSchema = z
  .object({
    currentPassword: z.string(),
    newPassword: z.string().min(6, {
      message: 'Şifre en az 6 karakter içermeli',
    }),
    newPasswordConfirmation: z.string().min(6, {
      message: 'Şifre en az 6 karakter içermeli',
    }),
  })
  .refine((data) => data.newPassword === data.newPasswordConfirmation, {
    message: 'Şifreler uyuşmuyor',
    path: ['newPasswordConfirmation'],
  });

const ChangePasswordForm = () => {
  const form = useForm<z.infer<typeof ChangePasswordSchema>>();

  const onSubmit = (data: z.infer<typeof ChangePasswordSchema>) => {
    console.log(data);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Güvenlik</CardTitle>
        <CardDescription>
          Şifrenizi yönetin ve hesabınızı güvende tutun
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Alert className='mb-4'>
          <AlertDescription>
            Eğer Google veya Facebook ile giriş yaptıysan ilk önce
            ,&apos;Şifremi Unuttum&apos; sayfasına giderek şifreni
            oluşturmalısın.
          </AlertDescription>
        </Alert>
        <Popover>
          <PopoverTrigger>
            <Button className='w-full'>Şifremi Değiştir</Button>
          </PopoverTrigger>
          <PopoverContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className='space-y-4'
              >
                <CustomFormField
                  fieldType={FormFieldType.PASSWORD}
                  control={form.control}
                  name='currentPassword'
                  placeholder='Mevcut şifre'
                />

                <CustomFormField
                  fieldType={FormFieldType.PASSWORD}
                  control={form.control}
                  name='newPassword'
                  placeholder='Yeni şifre'
                />

                <CustomFormField
                  fieldType={FormFieldType.PASSWORD}
                  control={form.control}
                  name='newPasswordConfirmation'
                  placeholder='Yeni şifre tekrar'
                />

                <SubmitButton
                  text='Şifreyi değiştir'
                  loading={form.formState.isSubmitting}
                  className='w-full'
                />
              </form>
            </Form>
          </PopoverContent>
        </Popover>
      </CardContent>
    </Card>
  );
};

export default ChangePasswordForm;
