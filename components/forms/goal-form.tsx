'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { GoalSchema } from '@/lib/schemas';
import { z } from 'zod';
import { Form } from '../ui/form';
import CustomFormField, { FormFieldType } from '../ui/custom-form-field';
import SubmitButton from './ui/submit-button';
import { createGoal } from '@/lib/services/goal-service';

const GoalForm = () => {
  const form = useForm<z.infer<typeof GoalSchema>>({
    resolver: zodResolver(GoalSchema),
    defaultValues: {
      title: '',
      startsAt: new Date(),
      target: 0,
    },
  });

  const [loading, setLoading] = useState<boolean>(false);

  async function onSubmit(values: z.infer<typeof GoalSchema>) {
    const res = await createGoal(values);
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

        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <CustomFormField
            fieldType={FormFieldType.NUMBER}
            control={form.control}
            name='target'
            label='Hedef miktarı'
          />

          <CustomFormField
            fieldType={FormFieldType.DATE_PICKER}
            control={form.control}
            name='startsAt'
            label='Başlangıç tarihi'
          />
        </div>

        <SubmitButton text='Ekle' loading={loading} />
      </form>
    </Form>
  );
};

export default GoalForm;
