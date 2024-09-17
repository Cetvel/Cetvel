// components/forms/StepNavigation.tsx
import React from 'react';
import { Button } from '@/components/ui/button';
import SubmitButton from '@/components/forms/ui/submit-button';
import { ArrowLeft, ArrowRight, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StepNavigationProps {
  step: number;
  setStep: (step: number) => void;
  isLastStep: boolean;
  isSubmitting: boolean;
}

const StepNavigation: React.FC<StepNavigationProps> = ({
  step,
  setStep,
  isLastStep,
  isSubmitting,
}) => {
  return (
    <div
      className={cn('flex pt-4', {
        'justify-between': step !== 0,
        'justify-end': step === 0,
      })}
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

      {!isLastStep && (
        <Button type='button' onClick={() => setStep(step + 1)}>
          İleri
          <ArrowRight size={16} />
        </Button>
      )}

      {isLastStep && (
        <SubmitButton
          text='Kullanmaya başla'
          icon={<Sparkles size={14} />}
          loading={isSubmitting}
        />
      )}
    </div>
  );
};

export default StepNavigation;
