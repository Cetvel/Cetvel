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
import { educationLevels, exams, fields, gradeOptions } from '@/constants';
import { PreferencesSchema } from '@/lib/schemas';
import { z } from 'zod';
import CustomFormField, {
  FormFieldType,
} from '@/components/ui/custom-form-field';
import { axiosInstance, fetcher } from '@/lib/utils';
import { toast } from 'sonner';
import UnsavedChangesNotification from './ui/unsaved-changes-notification';
import { ImageUploader } from '../global/image-uploader';
import { useEdgeStore } from '@/lib/edgestore';
import useSWR from 'swr';
import Spinner from '../ui/spinner';
import Error from '../global/error';
import { useUser } from '@/context/user-context';

const PreferencesForm = () => {
  const { user, isUserLoading, isUserError } = useUser();

  const form = useForm<z.infer<typeof PreferencesSchema>>({
    resolver: zodResolver(PreferencesSchema),
    defaultValues: {
      educationLevel: 'Lise',
      grade: user?.grade || 12,
      field: user?.field || 'SAY',
      courseSubject: user?.studyField || undefined,
      /* notifications: true, */
      /* taskReminders: false, */
      /* reminderFrequencyHours: 1, */
    },
  });

  const watchEducationLevel = form.watch('educationLevel');

  const onSubmit = async (values: z.infer<typeof PreferencesSchema>) => {
    const data = {
      grade: values.grade,
      field: values.field,
      studyField: values.courseSubject,
    };

    try {
      await axiosInstance.put('/settings/preference', data);

      toast.success('Değişiklikler kaydedildi', {
        description: 'Değişiklikleriniz başarıyla kaydedildi.',
      });
      form.reset();
    } catch (error) {
      console.error(error);
      toast.error('Bir hata oluştu', {
        description: 'Değişiklikleriniz kaydedilemedi.',
      });
    }
  };

  const { edgestore } = useEdgeStore();

  const onCoverPictureChange = async (url: string) => {
    try {
      if (user?.cover_picture) {
        await edgestore.publicFiles.delete({
          url: user?.cover_picture,
        });
      }
      await axiosInstance.put('/picture/cover', { url });
      toast.success('İşlem başarılı', {
        description: 'Arkaplan resmi başarıyla güncellendi',
      });
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
      if (user?.timer_picture) {
        await edgestore.publicFiles.delete({
          url: user?.timer_picture,
        });
      }
      await axiosInstance.put('/picture/timer', { url });
      toast.success('İşlem başarılı', {
        description: 'Zamanlayıcı arkaplanı başarıyla güncellendi',
      });
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
                    value={user?.cover_picture || undefined}
                    width={400}
                    height={225}
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
                    value={user?.timer_picture || undefined}
                    width={400}
                    height={225}
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

        <UnsavedChangesNotification form={form} />
      </form>
    </FormProvider>
  );
};

export default PreferencesForm;
