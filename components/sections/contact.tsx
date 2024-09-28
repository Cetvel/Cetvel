'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Mail } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { ContactSchema } from '@/lib/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '../ui/form';
import CustomFormField, { FormFieldType } from '../ui/custom-form-field';
import SubmitButton from '../forms/ui/submit-button';
import { axiosInstance } from '@/lib/utils';
import { toast } from 'sonner';

const ContactSection = () => {
  const form = useForm<z.infer<typeof ContactSchema>>({
    resolver: zodResolver(ContactSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
  });

  const onSubmit = async (data: z.infer<typeof ContactSchema>) => {
    try {
      await axiosInstance.post('/contact', data);
      toast.success('Mesajınız başarıyla gönderildi');
    } catch (error) {
      toast.error('Bir hata oluştu, lütfen tekrar deneyin');
      console.error(error);
    }
  };

  return (
    <section
      id='contact'
      className='py-20 bg-gradient-to-br from-primary/80 to-primary/100'
    >
      <div className='container mx-auto px-4'>
        <div className='flex flex-col lg:flex-row items-center gap-12'>
          <div className='lg:w-1/2 space-y-6'>
            <h2 className='text-4xl font-bold text-primary-foreground'>
              İletişime Geçin
            </h2>
            <p className='text-xl text-primary-foreground/80'>
              Bizimle iletişime geçmek için formu doldurabilir ya da doğrudan
              mail adresimizden bize ulaşabilirsiniz.
            </p>
            <div className='flex items-center space-x-4'>
              <div className='w-12 h-12 rounded-full bg-white/10 flex items-center justify-center'>
                <Mail className='w-6 h-6 text-primary-foreground' />
              </div>
              <div>
                <h3 className='text-lg font-semibold text-primary-foreground'>
                  Email Gönder
                </h3>
                <p className='text-primary-foreground/80'>
                  cetvelapp@gmail.com
                </p>
              </div>
            </div>
          </div>
          <Card className='lg:w-1/2 w-full shadow-xl'>
            <CardContent className='p-6'>
              <Form {...form}>
                <form
                  className='space-y-6'
                  onSubmit={form.handleSubmit(onSubmit)}
                >
                  <CustomFormField
                    fieldType={FormFieldType.INPUT}
                    control={form.control}
                    name='name'
                    label='İsim'
                    placeholder='İsminizi yazın'
                  />
                  <CustomFormField
                    fieldType={FormFieldType.INPUT}
                    control={form.control}
                    name='email'
                    label='E-Posta'
                    placeholder='E-Posta adresinizi yazın'
                  />
                  <CustomFormField
                    fieldType={FormFieldType.TEXTAREA}
                    control={form.control}
                    name='message'
                    label='Mesaj'
                    placeholder='Mesajınızı yazın'
                  />
                  <SubmitButton
                    loading={form.formState.isSubmitting}
                    text='Mesaj Gönder'
                    className='w-full'
                  />
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
