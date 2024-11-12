'use client';

import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from '@/components/ui/card';
import { SelectItem } from '@/components/ui/select';
import { PreferencesSchema } from '@/lib/schemas';
import { z } from 'zod';
import CustomFormField, {
  FormFieldType,
} from '@/components/ui/custom-form-field';
import { axiosInstance } from '@/lib/utils';
import { toast } from 'sonner';
import { ImageUploader } from '@/components/global/image-uploader';
import { mutate } from 'swr';
import Spinner from '@/components/ui/spinner';
import Error from '@/components/global/error';
import { useUser } from '@/features/users/contexts/user-context';
import {
  educationLevels,
  exams,
  fields,
  gradeOptions,
} from '@/features/users/configs';
import { useCallback, useEffect } from 'react';
import debounce from 'lodash/debounce';

const PreferencesForm = () => {
  const { user, isUserLoading, isUserError } = useUser();

  const form = useForm<z.infer<typeof PreferencesSchema>>({
    resolver: zodResolver(PreferencesSchema),
    defaultValues: {
      educationLevel: 'Lise',
      grade: user?.grade || 12,
      field: user?.field || 'SAY',
      exam: user?.exam,
    },
  });

  const watchEducationLevel = form.watch('educationLevel');

  const submitForm = async (values: z.infer<typeof PreferencesSchema>) => {
    try {
      await axiosInstance.put('/settings/preference', values);
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

  const debouncedSubmit = useCallback(
    debounce((values: z.infer<typeof PreferencesSchema>) => {
      submitForm(values);
    }, 1000),
    []
  );

  useEffect(() => {
    const subscription = form.watch((values) => {
      if (values) {
        debouncedSubmit(values as z.infer<typeof PreferencesSchema>);
      }
    });

    return () => {
      subscription.unsubscribe();
      debouncedSubmit.cancel();
    };
  }, [form, debouncedSubmit]);

  const onCoverPictureChange = async (url: string) => {
    try {
      await axiosInstance.put('/picture/cover', { url });
      toast.success('İşlem başarılı', {
        description: 'Arkaplan resmi başarıyla güncellendi',
      });
      mutate('/users');
    } catch (error: any) {
      console.error('Arkaplan resmi güncellenirken hata:', error);
      toast.error('İşlem sırasında bir hata oluştu', {
        description:
          error.response?.data?.message ||
          'Arkaplan resmi güncellenirken bir hata oluştu',
      });
    }
  };

  const onTimerPictureChange = async (url: string) => {
    try {
      await axiosInstance.put('/picture/timer', { url });
      toast.success('İşlem başarılı', {
        description: 'Zamanlayıcı arkaplanı başarıyla güncellendi',
      });
      mutate('/users');
    } catch (error: any) {
      console.error('Zamanlayıcı arkaplanı güncellenirken hata:', error);
      toast.error('İşlem sırasında bir hata oluştu', {
        description:
          error.response?.data?.message ||
          'Zamanlayıcı arkaplanı güncellenirken bir hata oluştu',
      });
    }
  };

  return (
    <div className='space-y-6'>
      <FormProvider {...form}>
        <form className='space-y-6'>
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
                {educationLevels.map((level: any) => (
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
                  name='class'
                  label='Sınıfın'
                >
                  {gradeOptions[watchEducationLevel].map((grade) => (
                    <SelectItem key={grade} value={grade.toString()}>
                      {grade}
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
        </form>
      </FormProvider>
      <Card className='w-full'>
        <CardHeader>
          <CardTitle>Arayüz Tercihleri</CardTitle>
          <CardDescription>
            Arayüz tercihlerinizi buradan güncelleyebilirsiniz.
          </CardDescription>
        </CardHeader>
        <CardContent className='space-y-6'>
          <div className='grid grid-cols-2 gap-4'>
            {isUserLoading ? (
              <Spinner size={24} />
            ) : isUserError ? (
              <Error
                title='Bir hata oluştu'
                message={isUserError.message || 'Beklenmedik sunucu hatası'}
              />
            ) : (
              <>
                <ImageUploader
                  onChange={(url) => onCoverPictureChange(url)}
                  value={user?.cover_picture || '/image/banner_default.jpg'}
                  width={400}
                  className='w-full'
                  height={225}
                  layout='responsive'
                  cropConfig={{
                    aspect: 16 / 9,
                    minWidth: 400,
                    minHeight: 225,
                  }}
                  maxSize={5}
                  placeholder='Karşılayıcı arkaplan fotoğrafı yükle'
                />
                <ImageUploader
                  onChange={(url) => onTimerPictureChange(url)}
                  value={user?.timer_picture || '/image/timer_default.jpg'}
                  width={400}
                  className='w-full'
                  height={225}
                  layout='responsive'
                  cropConfig={{
                    aspect: 16 / 9,
                    minWidth: 400,
                    minHeight: 225,
                  }}
                  maxSize={5}
                  placeholder='Zamanlayıcı arkaplan fotoğrafı yükle'
                />
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PreferencesForm;
