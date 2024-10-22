'use client';

import React, { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { SelectItem } from '@/components/ui/select';
import { educationLevels, exams, fields, gradeOptions } from '@/constants';
import { PreferencesSchema } from '@/lib/schemas';
import { z } from 'zod';
import CustomFormField, {
  FormFieldType,
} from '@/components/ui/custom-form-field';
import ImageUploader from '@/components/global/image-uploader';
import SubmitButton from '@/components/forms/ui/submit-button';
import { axiosInstance } from '@/lib/utils';
import { toast } from 'sonner';

const PreferencesForm = () => {
  const form = useForm<z.infer<typeof PreferencesSchema>>({
    resolver: zodResolver(PreferencesSchema),
    defaultValues: {
      educationLevel: 'Lise',
      grade: 12,
      field: 'SAY',
      courseSubject: undefined,
      notifications: true,
      taskReminders: false,
      reminderFrequencyHours: 1,
    },
  });

  const watchEducationLevel = form.watch('educationLevel');

  const onSubmit = async (values: z.infer<typeof PreferencesSchema>) => {
    try {
      await axiosInstance.put('/settings/userPreference', values);

      toast.success('Değişiklikler kaydedildi', {
        description: 'Değişiklikleriniz başarıyla kaydedildi.',
      });
    } catch (error) {
      console.error(error);
      toast.error('Bir hata oluştu', {
        description: 'Değişiklikleriniz kaydedilemedi.',
      });
    }
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
        <Card className='w-full'>
          <CardHeader>
            <CardTitle>Eğitim Bilgileri</CardTitle>
            <CardDescription>
              Eğitim bilgilerinizi buradan güncelleyebilirsiniz.
            </CardDescription>
          </CardHeader>
          <CardContent className='gap-6 grid grid-cols-1 lg:grid-cols-3'>
            <CustomFormField
              fieldType={FormFieldType.SELECT}
              control={form.control}
              name='educationLevel'
              label='Eğitim Seviyen'
            >
              {educationLevels.map((level) => (
                <SelectItem key={level} value={level}>
                  {level}
                </SelectItem>
              ))}
            </CustomFormField>

            {watchEducationLevel === 'Lise' && (
              <CustomFormField
                fieldType={FormFieldType.SELECT}
                control={form.control}
                name='field'
                label='Alanın'
              >
                {fields.map((field) => (
                  <SelectItem key={field.value} value={field.value}>
                    {field.label}
                  </SelectItem>
                ))}
              </CustomFormField>
            )}

            {watchEducationLevel !== 'Mezun' && (
              <CustomFormField
                fieldType={FormFieldType.SELECT}
                control={form.control}
                name='grade'
                label='Sınıfın'
              >
                {gradeOptions[
                  watchEducationLevel as keyof typeof gradeOptions
                ]?.map((grade, i) => (
                  <SelectItem key={i} value={grade.toString()}>
                    {grade}. Sınıf
                  </SelectItem>
                ))}
              </CustomFormField>
            )}

            {watchEducationLevel === 'Mezun' && (
              <CustomFormField
                fieldType={FormFieldType.SELECT}
                control={form.control}
                name='courseSubjects'
                label='Sınav türün'
              >
                {exams.map((exam, i) => (
                  <SelectItem key={i} value={exam}>
                    {exam}
                  </SelectItem>
                ))}
              </CustomFormField>
            )}
          </CardContent>
        </Card>

        {/* <Card className='w-full mb-6'>
          <CardHeader>
            <CardTitle>Bildirimler</CardTitle>
            <CardDescription>
              Bildirim tercihlerinizi buradan güncelleyebilirsiniz.
            </CardDescription>
          </CardHeader>
          <CardContent className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
            <div className='form-line'>
              <Label htmlFor='notifications'>Bildirimleri Etkinleştir</Label>
              <CustomFormField
                fieldType={FormFieldType.SWITCH}
                control={form.control}
                name='notifications'
              />
            </div>
            <div className='form-line'>
              <Label htmlFor='taskReminders'>Görev Hatırlatıcıları</Label>
              <CustomFormField
                fieldType={FormFieldType.SWITCH}
                control={form.control}
                name='taskReminders'
              />
            </div>
            <div className='form-line'>
              <Label htmlFor='reminderFrequency'>
                Görev Hatırlatma Sıklığı
              </Label>
              <div className='flex items-center gap-x-2'>
                <CustomFormField
                  fieldType={FormFieldType.NUMBER}
                  control={form.control}
                  name='reminderFrequencyHours'
                  className='w-16'
                />
                <span className='text-xs'>saat aralıklarla hatırlatma yap</span>
              </div>
            </div>
          </CardContent>
        </Card> */}

        <Card className='w-full'>
          <CardHeader>
            <CardTitle>Arayüz Tercihleri</CardTitle>
            <CardDescription>
              Arayüz tercihlerinizi buradan güncelleyebilirsiniz.
            </CardDescription>
          </CardHeader>
          <CardContent className='space-y-6'>
            <div className='grid grid-cols-2 gap-4'>
              <ImageUploader
                label='Karşılayıcı arkaplanı'
                apiEndpoint='picture/cover'
              />
              <ImageUploader
                label='Zamanlayıcı arkaplanı'
                apiEndpoint='picture/timer'
              />
            </div>
          </CardContent>
        </Card>

        <SubmitButton
          text='Değişiklikleri Kaydet'
          loading={form.formState.isSubmitting}
        />
      </form>
    </FormProvider>
  );
};

export default PreferencesForm;
