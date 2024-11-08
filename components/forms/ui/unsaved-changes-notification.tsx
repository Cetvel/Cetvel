import { Button } from '@/components/ui/button';
import { AnimatePresence, motion } from 'framer-motion';
import SubmitButton from './submit-button';
import { UseFormReturn } from 'react-hook-form';

type Props = {
  form: UseFormReturn<any>;
  hasUnsavedChanges?: boolean;
};

const UnsavedChangesNotification = ({
  form,
  hasUnsavedChanges = false,
}: Props) => {
  const variants = {
    initial: {
      opacity: 0,
      y: 20,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.2,
        ease: 'easeOut',
      },
    },
    exit: {
      opacity: 0,
      y: 20,
      transition: {
        duration: 0.2,
        ease: 'easeIn',
      },
    },
  };

  return hasUnsavedChanges ? (
    <AnimatePresence>
      {form.formState.isDirty && (
        <motion.div
          variants={variants}
          initial='initial'
          animate='animate'
          exit='exit'
          className='flex fixed bottom-10 right-12 left-16 rounded-xl border bg-card px-4 py-2 justify-between items-center max-w-6xl w-full z-50'
        >
          <p className='text-muted-foreground text-sm'>
            Kaydedilmemiş değişiklikler var! Kaydetmek ister misin?{' '}
          </p>

          <div className='flex gap-2'>
            <Button
              type='reset'
              variant='outline'
              onClick={() => form.reset()}
              size='sm'
            >
              İptal
            </Button>

            <SubmitButton
              loading={form.formState.isSubmitting}
              text='Değişiklikleri kaydet'
              size='sm'
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  ) : null;
};

export default UnsavedChangesNotification;
