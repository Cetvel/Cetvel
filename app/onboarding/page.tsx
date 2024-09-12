// app/onboarding/page.tsx
'use client';

import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import OnboardingForm from '@/components/forms/onboading/form';

const OnboardingPage: React.FC = () => {
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
        <OnboardingForm />
      </CardContent>
    </Card>
  );
};

export default OnboardingPage;
