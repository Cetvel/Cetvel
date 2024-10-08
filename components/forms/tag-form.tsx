'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TagSchema } from '@/lib/schemas';
import { mutate } from 'swr';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '../ui/form';
import SubmitButton from './ui/submit-button';
import { Input } from '../ui/input';
import { axiosInstance } from '@/lib/utils';
import { toast } from 'sonner';

const TagForm = () => {
  const form = useForm<z.infer<typeof TagSchema>>({
    resolver: zodResolver(TagSchema),
    defaultValues: {
      label: '',
    },
  });

  async function onSubmit(values: z.infer<typeof TagSchema>) {
    const data = {
      label: values.label,
      value: values.label,
    };

    try {
      const res = await axiosInstance.post('/tag', data);

      if (res.status === 200) {
        form.reset();
        toast.success(values.label, {
          description: 'Etiket oluşturuldu',
        });
        mutate('/tag');
      }
    } catch (error: any) {
      toast.error('Bir hata oluştu', {
        description: error.error,
      });
      console.error(error);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='flex items-center space-x-2 flex-col sm:flex-row'
      >
        <FormField
          control={form.control}
          name='label'
          render={({ field }) => (
            <FormItem className='w-full'>
              <FormControl>
                <Input {...field} placeholder='Etiket adı' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <SubmitButton
          text='Ekle'
          className='ml-auto'
          loading={form.formState.isSubmitting}
        />
      </form>
    </Form>
  );
};

export default TagForm;
