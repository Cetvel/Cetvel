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
import { Alert, AlertDescription } from '@/components/ui/alert';
import Link from 'next/link';
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
        <Link href={'/'}>
          <Button variant={'secondary'}>Şifremi sıfırla</Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default ChangePasswordForm;
