'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { GoalSchema } from '@/lib/schemas';
import { z } from 'zod';
import { Form } from '@/components/ui/form';
import DynamicFormField, {
  FormFieldType,
} from '@/components/ui/dynamic-form-field';
import SubmitButton from '@/components/forms/ui/submit-button';
import { createGoal, deleteGoal, updateGoal } from '@/features/goals/actions';
import { useModal } from '@/providers/modal-provider';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import Spinner from '@/components/ui/spinner';

interface GoalFormProps {
  initialData?: Goal;
  onSuccess?: () => void;
}

const GoalForm: React.FC<GoalFormProps> = ({ initialData, onSuccess }) => {
  const { setClose } = useModal();
  const [deleting, setDeleting] = useState(false);

  const form = useForm<z.infer<typeof GoalSchema>>({
    resolver: zodResolver(GoalSchema),
    defaultValues: {
      title: '',
      startsAt: new Date(),
      endsAt: new Date(),
      totalUnits: 0,
    },
  });

  useEffect(() => {
    if (initialData) {
      form.reset(initialData);
    }
  }, [initialData, form]);

  async function onSubmit(data: z.infer<typeof GoalSchema>) {
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
      console.error(error);
    }
  }

  async function onDelete(_id: string) {
    setDeleting(true);

    try {
      await deleteGoal(_id);
      setClose();
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error(error);
    } finally {
      setDeleting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
        <DynamicFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name='title'
          placeholder='Başlık ekleyin'
          label='Hedef başlığı'
        />
        <DynamicFormField
          fieldType={FormFieldType.NUMBER}
          control={form.control}
          name='totalUnits'
          label='Hedef miktarı'
        />
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <DynamicFormField
            fieldType={FormFieldType.DATE_PICKER}
            control={form.control}
            name='startsAt'
            label='Başlangıç tarihi'
          />
          <DynamicFormField
            fieldType={FormFieldType.DATE_PICKER}
            control={form.control}
            name='endsAt'
            label='Bitiş tarihi'
          />
        </div>

        <div className='flex justify-end items-center gap-4'>
          <SubmitButton
            text={initialData ? 'Güncelle' : 'Ekle'}
            loading={form.formState.isSubmitting}
          />
          {initialData && (
            <Button
              variant='destructive'
              onClick={() => onDelete(initialData._id)}
              disabled={deleting}
            >
              {deleting && <Spinner />}
              Sil
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
};

export default GoalForm;
