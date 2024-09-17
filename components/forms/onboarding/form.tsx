'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import { onboardingSchema } from '@/lib/schemas';
import FormStepper from '@/components/ui/form-stepper';
import { EducationStep, InterfaceStep, NotificationStep } from './steps';
import StepNavigation from './step-navigation';
import { submitOnboarding } from '@/lib/services/onboarding-service';
import { Form } from '@/components/ui/form';
import { toast } from 'sonner';

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

const OnboardingForm: React.FC = () => {
  const [step, setStep] = useState<number>(0);
  const form = useForm<z.infer<typeof onboardingSchema>>({
    resolver: zodResolver(onboardingSchema),
    defaultValues: {
      educationLevel: 'Lise',
      field: 'SAY',
      grade: 12,
    },
  });
  const router = useRouter();
  const { user } = useUser();

  const onSubmit = async (values: z.infer<typeof onboardingSchema>) => {
    let studyField: string;

    if (
      values.educationLevel === 'İlkokul' ||
      values.educationLevel === 'Ortaokul'
    ) {
      studyField = 'LGS';
    } else if (values.educationLevel === 'Lise') {
      studyField = 'YKS';
    } else if (values.educationLevel === 'Mezun') {
      studyField = values.courseSubjects || '';
    } else {
      studyField = '';
    }

    const data = {
      studyField: studyField,
      studentClass: values.grade,
      notification: values.notifications,
    };

    if (values.educationLevel === 'Lise') {
      /* @ts-ignore */
      data.aytField = values.field;
    }

    try {
      const success = await submitOnboarding(data);
      if (success) {
        await user?.reload();
        router.push('/dashboard');
      } else {
        console.error('Onboarding failed');
        toast.error('Onboarding başarısız', {
          description: 'Lütfen daha sonra tekrar deneyin.',
        });
      }
    } catch (error) {
      console.error('Onboarding error:', error);
      toast.error('Bir hata oluştu', {
        description: 'Onboarding işlemi sırasında bir hata oluştu.',
      });
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='flex flex-col space-y-4 mt-6'
      >
        <FormStepper
          activeStep={step}
          steps={steps}
          onStepChange={(step) => setStep(step)}
        />

        {step === 0 && <EducationStep />}
        {step === 1 && <NotificationStep />}
        {step === 2 && <InterfaceStep />}

        <StepNavigation
          step={step}
          setStep={setStep}
          isLastStep={step === 2}
          isSubmitting={form.formState.isSubmitting}
        />
      </form>
    </Form>
  );
};

export default OnboardingForm;
