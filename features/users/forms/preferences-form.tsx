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

  // Sınıf bilgisine göre eğitim seviyesini belirleyen fonksiyon
  const determineEducationLevel = (grade?: number): string => {
    if (!grade) return 'Mezun';

    if (grade >= 9 && grade <= 12) return 'Lise';
    if (grade >= 5 && grade <= 8) return 'Ortaokul';
    if (grade >= 1 && grade <= 4) return 'İlkokul';

    return 'Lise';
  };

  const getDefaultClass = (
    educationLevel: 'İlkokul' | 'Ortaokul' | 'Lise' | 'Mezun',
    userGrade?: number
  ) => {
    if (!educationLevel || educationLevel === 'Mezun') return undefined;

    const availableGrades = gradeOptions[educationLevel];
    if (!availableGrades?.length) return undefined;

    // Eğer kullanıcının sınıfı varsa ve geçerli bir değerse kullan
    if (userGrade && availableGrades.includes(userGrade)) {
      return userGrade;
    }

    return availableGrades[availableGrades.length - 1];
  };

  const currentEducationLevel = determineEducationLevel(user?.grade) as
    | 'İlkokul'
    | 'Ortaokul'
    | 'Lise'
    | 'Mezun';

  const form = useForm<z.infer<typeof PreferencesSchema>>({
    resolver: zodResolver(PreferencesSchema),
    defaultValues: {
      educationLevel: currentEducationLevel,
      grade: getDefaultClass(currentEducationLevel, user?.grade),
      field:
        currentEducationLevel === 'Lise' ? user?.field || 'SAY' : undefined,
      exam:
        currentEducationLevel === 'Lise'
          ? 'YKS'
          : currentEducationLevel === 'Ortaokul'
            ? 'LGS'
            : user?.exam,
    },
  });

  const watchEducationLevel = form.watch('educationLevel');

  // Eğitim seviyesi değiştiğinde sınıf ve alan bilgilerini güncelle
  useEffect(() => {
    const defaultClass = getDefaultClass(watchEducationLevel);

    // Sınıf değerini güncelle
    form.setValue('grade', defaultClass);

    // Alan bilgisini güncelle
    if (watchEducationLevel !== 'Lise') {
      form.setValue('field', undefined);
    } else if (!form.getValues('field')) {
      form.setValue('field', 'SAY');
    }

    // Sınav tipini güncelle
    const examValue =
      watchEducationLevel === 'Lise'
        ? 'YKS'
        : watchEducationLevel === 'Ortaokul'
          ? 'LGS'
          : watchEducationLevel === 'Mezun'
            ? user?.exam
            : undefined;

    form.setValue('exam', examValue);
  }, [watchEducationLevel, form, user?.exam]);

  const submitForm = async (values: z.infer<typeof PreferencesSchema>) => {
    const data = {
      educationLevel: values.educationLevel,
      field: values.educationLevel === 'Lise' ? values.field : undefined,
      grade: values.educationLevel === 'Mezun' ? undefined : values.grade,
      exam:
        values.educationLevel === 'Lise'
          ? 'YKS'
          : values.educationLevel === 'Ortaokul'
            ? 'LGS'
            : values.educationLevel === 'İlkokul'
              ? undefined
              : values.exam,
    };

    try {
      await axiosInstance.put('/settings/preference', data);
      toast.success('Değişiklikler kaydedildi', {
        description: 'Değişiklikleriniz başarıyla kaydedildi.',
      });
      mutate('/users');
    } catch (error: any) {
      console.error('Form gönderimi sırasında hata:', error);
      toast.error('Bir hata oluştu', {
        description:
          error.response?.data?.message || 'Değişiklikleriniz kaydedilemedi.',
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

  const onImageChange = async (url: string, type: 'cover' | 'timer') => {
    try {
      await axiosInstance.put(`/picture/${type}`, { url });
      toast.success('İşlem başarılı', {
        description: `${type === 'cover' ? 'Arkaplan' : 'Zamanlayıcı arkaplanı'} başarıyla güncellendi`,
      });
      mutate('/users');
    } catch (error: any) {
      console.error(`${type} resmi güncellenirken hata:`, error);
      toast.error('İşlem sırasında bir hata oluştu', {
        description:
          error.response?.data?.message ||
          `${type === 'cover' ? 'Arkaplan' : 'Zamanlayıcı arkaplanı'} güncellenirken bir hata oluştu`,
      });
    }
  };

  isUserLoading && <Spinner size={24} />;

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
                {educationLevels.map((level: string) => (
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
                  {gradeOptions[watchEducationLevel]?.map((grade) => (
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
                  name='exam'
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
                  onChange={(url) => onImageChange(url, 'cover')}
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
                  onChange={(url) => onImageChange(url, 'timer')}
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
