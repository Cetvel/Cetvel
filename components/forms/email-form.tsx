'use client';

import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { Form } from '../ui/form';
import useSWR, { mutate } from 'swr';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Button } from '../ui/button';
import { Edit } from 'lucide-react';
import CustomFormField, { FormFieldType } from '../ui/custom-form-field';
import SubmitButton from './ui/submit-button';
import Spinner from '../ui/spinner';
import Error from '../global/error';
import { axiosInstance, fetcher } from '@/lib/utils';
import { useUser } from '@/features/users/contexts/user-context';
import { toast } from 'sonner';

const Schema = z.object({
  email: z.string().email({
    message: 'Geçerli bir e-posta adresi girmelisin',
  }),
});

const EmailForm = () => {
  const { user } = useUser();

  const form = useForm<z.infer<typeof Schema>>({
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (data: z.infer<typeof Schema>) => {
    try {
      await axiosInstance.put('/settings/user/email', data);
      toast.success('İşlem başarılı', {
        description: 'E-Posta adresiniz başarıyla güncellendi',
      });
      mutate('/users');
    } catch (error: any) {
      toast.error('İşlem sırasında bir hata oluştu', {
        description:
          error.response?.data?.message ||
          'E-Posta adresiniz güncellenirken bir hata oluştu',
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>E-Posta Adresi</CardTitle>
        <CardDescription>E-Posta adresinizi yönetin</CardDescription>
      </CardHeader>

      <CardContent className='flex items-center justify-between'>
        <p>{user?.email}</p>
        <Popover>
          <PopoverTrigger>
            <Button size={'icon-sm'} variant={'outline'}>
              <Edit size={16} />
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className='space-y-4'
              >
                <CustomFormField
                  name='email'
                  placeholder='E-Posta Adresi'
                  control={form.control}
                  fieldType={FormFieldType.INPUT}
                />
                <SubmitButton
                  className='w-full'
                  loading={form.formState.isSubmitting}
                  text='Değiştir'
                />
              </form>
            </Form>
          </PopoverContent>
        </Popover>
      </CardContent>
    </Card>
  );
};

export default EmailForm;
