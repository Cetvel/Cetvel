'use client';

import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import useSWR, { mutate } from 'swr';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Edit } from 'lucide-react';
import DynamicFormField, {
  FormFieldType,
} from '@/components/ui/dynamic-form-field';
import SubmitButton from '@/components/forms/ui/submit-button';
import Spinner from '@/components/ui/spinner';
import Error from '@/components/global/error';
import { axiosInstance, fetcher } from '@/lib/utils';
import { useUser } from '@/features/users/contexts/user-context';
import { toast } from 'sonner';
import { Alert, AlertDescription } from '@/components/ui/alert';

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

      <CardContent>
        <div className='flex items-center justify-between'>
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
                  <DynamicFormField
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
        </div>
      </CardContent>
    </Card>
  );
};

export default EmailForm;
