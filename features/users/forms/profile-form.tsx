'use client';

import { useUser } from '@/features/users/contexts/user-context';
import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import { ImageUploader } from '@/components/global/image-uploader';
import { axiosInstance } from '@/lib/utils';
import { toast } from 'sonner';
import { mutate } from 'swr';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Edit } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useForm } from 'react-hook-form';
import CustomFormField, {
  FormFieldType,
} from '@/components/ui/custom-form-field';
import SubmitButton from '@/components/forms/ui/submit-button';

const Schema = z.object({
  username: z.string().min(3).max(255),
});

const ProfileForm = () => {
  const { user } = useUser();
  console.log('User: ', user);

  const form = useForm<z.infer<typeof Schema>>({
    defaultValues: {
      username: '',
    },
  });

  const onSubmit = async (data: z.infer<typeof Schema>) => {
    try {
      await axiosInstance.put('/settings/user', data);
      toast.success('İşlem başarılı', {
        description: 'Profiliniz başarıyla güncellendi',
      });
      mutate('/users');
    } catch (error: any) {
      toast.error('İşlem sırasında bir hata oluştu', {
        description:
          error.response?.data?.message ||
          'Profiliniz güncellenirken bir hata oluştu',
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

  return (
    <Card>
      <CardHeader>
        <CardTitle>Kullanıcı ayarları</CardTitle>
        <CardDescription>Profilinizi ve isminizi yönetin</CardDescription>
      </CardHeader>
      <CardContent className='flex gap-4'>
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
        <div className='flex gap-4 items-center ml-2 w-full justify-between'>
          <div>
            <p className='text-sm text-muted-foreground'>İsim</p>
            <p className='text-lg font-semibold -mt-1'>{user?.name}</p>
          </div>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant={'outline'} size={'icon-sm'}>
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
                    fieldType={FormFieldType.INPUT}
                    control={form.control}
                    name='username'
                    placeholder='İsmi değiştir'
                  />

                  <SubmitButton
                    className='w-full'
                    loading={form.formState.isSubmitting}
                    text='Kaydet'
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

export default ProfileForm;
