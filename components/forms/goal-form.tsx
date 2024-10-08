'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { GoalSchema } from '@/lib/schemas';
import { z } from 'zod';
import { Form } from '../ui/form';
import CustomFormField, { FormFieldType } from '../ui/custom-form-field';
import SubmitButton from './ui/submit-button';
import { createGoal, updateGoal } from '@/lib/services/goal-service';
import { useModal } from '@/providers/modal-provider';
import { useEffect } from 'react';

interface GoalFormProps {
  initialData?: Goal;
  onSuccess?: () => void;
}

const GoalForm: React.FC<GoalFormProps> = ({ initialData, onSuccess }) => {
  const { setClose } = useModal();

  const form = useForm<z.infer<typeof GoalSchema>>({
    resolver: zodResolver(GoalSchema),
    defaultValues: {
      title: '',
      startsAt: new Date(),
      endsAt: new Date(),
      target: 0,
    },
  });

  useEffect(() => {
    if (initialData) {
      form.reset(initialData);
    }
  }, [initialData, form]);

  async function onSubmit(values: z.infer<typeof GoalSchema>) {
    const data = {
      ...values,
      target: Number(values.target),
    };

    try {
      let res;
      if (initialData) {
        res = await updateGoal(initialData._id, data);
      } else {
        res = await createGoal(data);
      }

      if (res) {
        form.reset();
        setClose();
        if (onSuccess) onSuccess();
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name='title'
          placeholder='Başlık ekleyin'
          label='Hedef başlığı'
        />
        <CustomFormField
          fieldType={FormFieldType.NUMBER}
          control={form.control}
          name='target'
          label='Hedef miktarı'
        />
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <CustomFormField
            fieldType={FormFieldType.DATE_PICKER}
            control={form.control}
            name='startsAt'
            label='Başlangıç tarihi'
          />
          <CustomFormField
            fieldType={FormFieldType.DATE_PICKER}
            control={form.control}
            name='endsAt'
            label='Bitiş tarihi'
          />
        </div>
        <SubmitButton
          text={initialData ? 'Güncelle' : 'Ekle'}
          loading={form.formState.isSubmitting}
        />
      </form>
    </Form>
  );
};

export default GoalForm;
