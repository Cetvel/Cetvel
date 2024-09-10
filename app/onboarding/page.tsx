'use client';

import SubmitButton from '@/components/forms/ui/submit-button';
import ImageUploader from '@/components/global/image-uploader';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import CustomFormField, {
  FormFieldType,
} from '@/components/ui/custom-form-field';
import { FormDescription, FormLabel } from '@/components/ui/form';
import FormStepper from '@/components/ui/form-stepper';
import { SelectItem } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { onboardingSchema } from '@/lib/schemas';
import { axiosInstance, cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft, ArrowRight, Sparkles } from 'lucide-react';
import React, { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';

const educationLevels = ['İlkokul', 'Ortaokul', 'Lise', 'Mezun'];
const fields = ['Sayısal', 'Sözel', 'Eşit Ağırlık', 'Dil'];
const exams = ['YKS', 'KPSS', 'DGS', 'ALES', 'YDS'];
const steps = [
  {
    label: 'Eğitim bilgilerin',
    description: 'Alanın ve eğitim düzeyine dair bilgiler',
  },
  {
    label: 'Bildirimler',
    description: 'Hatırlatıcılar ve bildirimlerin yönetimi',
  },
  {
    label: 'Arayüz tercihi',
    description: 'Uygulamayı kişiselleştir',
  },
];
const gradeOptions = {
  İlkokul: ['1', '2', '3', '4'],
  Ortaokul: ['5', '6', '7', '8'],
  Lise: ['9', '10', '11', '12'],
};

const Onboarding = () => {
  const form = useForm<z.infer<typeof onboardingSchema>>({
    resolver: zodResolver(onboardingSchema),
    defaultValues: {
      educationLevel: 'Lise',
      field: 'Sayısal',
      grade: '12',
    },
  });
  const { toast } = useToast();

  const [step, setStep] = useState<number>(0);

  const watchEducationLevel = form.watch('educationLevel');

  async function onSubmit(values: z.infer<typeof onboardingSchema>) {
    const data = {
      isOnboarded: true,
      studyField: values.field
        ? values.field
        : values.educationLevel === 'Lise'
          ? 'YKS'
          : 'LGS',
      studentClass: values.grade,
      ...values,
    };

    try {
      const response = await axiosInstance.post('/onboarding', data);
      console.log('Onboarding response:', response.data);
    } catch (error) {
      console.error('Onboarding error:', error);
      toast({
        title: 'Bir hata oluştu',
        description: 'Onboarding işlemi sırasında bir hata oluştu.',
        variant: 'destructive',
      });
    } finally {
    }
  }

  const handleImageUpload = async (
    file: File,
    imageType: 'cover' | 'timer'
  ) => {
    form.setValue(imageType === 'cover' ? 'coverImage' : 'timerImage', file);
  };

  return (
    <Card className='max-w-3xl w-full'>
      <CardHeader>
        <h1 className='text-2xl font-semibold'>Cetvel&apos;e hoşgeldin! 👋</h1>
        <p className='text-muted-foreground'>
          Sana en iyi deneyimi sunabilmemiz için birkaç adımı tamamlaman
          gerekiyor.
        </p>
      </CardHeader>
      <CardContent className='border-t pt-6'>
        <FormStepper
          activeStep={step}
          steps={steps}
          onStepChange={(step) => setStep(step)}
        />

        <FormProvider {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='flex flex-col space-y-4 mt-6'
          >
            {step === 0 && (
              <>
                <CustomFormField
                  fieldType={FormFieldType.SELECT}
                  control={form.control}
                  name='educationLevel'
                  label='Eğitim seviyen'
                >
                  {educationLevels.map((level, i) => (
                    <SelectItem key={i} value={level}>
                      {level}
                    </SelectItem>
                  ))}
                </CustomFormField>

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
                      <SelectItem key={i} value={grade}>
                        {grade}. Sınıf
                      </SelectItem>
                    ))}
                  </CustomFormField>
                )}

                {watchEducationLevel === 'Lise' && (
                  <CustomFormField
                    fieldType={FormFieldType.SELECT}
                    control={form.control}
                    name='field'
                    label='Alanın'
                  >
                    {fields.map((field, i) => (
                      <SelectItem key={i} value={field}>
                        {field}
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
              </>
            )}

            {step === 1 && (
              <div className='form-line'>
                <div className='flex flex-col space-y-0.5 flex-grow'>
                  <FormLabel>Bildirimler</FormLabel>
                  <FormDescription>
                    Etütlerin ve görevlerin hakkında hatırlatıcı ve diğer
                    bildirimleri almak ister misin?
                  </FormDescription>
                </div>

                <CustomFormField
                  fieldType={FormFieldType.SWITCH}
                  control={form.control}
                  name='notifications'
                />
              </div>
            )}

            {step === 2 && (
              <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
                <ImageUploader
                  label='Kapak Resmi'
                  onUpload={(file) => handleImageUpload(file, 'cover')}
                  onError={(error) =>
                    console.error('Cover image upload error:', error)
                  }
                />

                <ImageUploader
                  label='Zamanlayıcı Resmi'
                  onUpload={(file) => handleImageUpload(file, 'timer')}
                  onError={(error) =>
                    console.error('Timer image upload error:', error)
                  }
                />
              </div>
            )}

            <div
              className={cn(
                'flex pt-6 border-t border-t-neutral-200 dark:border-neutral-500',
                {
                  'justify-between': step !== 0,
                  'justify-end': step === 0,
                }
              )}
            >
              {step !== 0 && (
                <Button
                  type='button'
                  variant={'secondary'}
                  onClick={() => setStep(step - 1)}
                >
                  <ArrowLeft size={16} />
                  Geri Dön
                </Button>
              )}

              {step !== 2 && (
                <Button type='button' onClick={() => setStep(step + 1)}>
                  İleri
                  <ArrowRight size={16} />
                </Button>
              )}

              {step === 2 && (
                <SubmitButton
                  text='Kullanmaya başla'
                  icon={<Sparkles size={14} />}
                  loading={form.formState.isSubmitting}
                />
              )}
            </div>
          </form>
        </FormProvider>
      </CardContent>
    </Card>
  );
};

export default Onboarding;
