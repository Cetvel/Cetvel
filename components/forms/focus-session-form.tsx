import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FocusSessionSchema } from '@/lib/schemas';
import { z } from 'zod';
import { Form } from '../ui/form';
import CustomFormField, { FormFieldType } from '../ui/custom-form-field';
import SubmitButton from './ui/submit-button';
import { SelectItem } from '../ui/select';
import useSWR from 'swr';
import { fetcher } from '@/lib/utils';
import {
  createFocusSession,
  updateFocusSession,
} from '@/lib/services/focus-service';
import { useModal } from '@/providers/modal-provider';
import Spinner from '../ui/spinner';

type FocusSessionFormValues = z.infer<typeof FocusSessionSchema>;

interface FocusSessionFormProps {
  editSession?: Focus;
}

const FocusSessionForm: React.FC<FocusSessionFormProps> = ({ editSession }) => {
  const { setClose } = useModal();
  const {
    data: tags,
    isLoading: isTagsLoading,
    error: tagsError,
  } = useSWR<Tag[]>('/tags', fetcher);

  const form = useForm<FocusSessionFormValues>({
    resolver: zodResolver(FocusSessionSchema),
    defaultValues: {
      title: editSession?.title || '',
      tag: editSession?.tag || '',
      duration: editSession?.duration || 0,
      startsAt: editSession?.startsAt
        ? new Date(editSession.startsAt)
        : new Date(),
    },
  });

  const onSubmit = async (values: FocusSessionFormValues) => {
    const data = {
      ...values,
      startsAt: values.startsAt.toISOString(),
      endsAt: new Date(
        values.startsAt.getTime() + values.duration * 60 * 1000
      ).toISOString(),
    };

    let success;
    if (editSession) {
      success = await updateFocusSession(editSession._id, data);
    } else {
      success = await createFocusSession(data);
    }

    if (success) {
      form.reset();
      setClose();
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name='title'
          label='Başlık'
          placeholder='Odak oturumu başlığı'
        />
        <CustomFormField
          fieldType={FormFieldType.SELECT}
          control={form.control}
          name='tag'
          label='Etiket'
          placeholder='Etiket seçin'
        >
          {tags ? (
            tags.map((tag: Tag) => (
              <SelectItem key={tag._id} value={tag._id}>
                {tag.label}
              </SelectItem>
            ))
          ) : isTagsLoading ? (
            <SelectItem value='loading' disabled>
              <Spinner />
            </SelectItem>
          ) : tagsError ? (
            <SelectItem value='error' disabled>
              Etiketler yüklenemedi
            </SelectItem>
          ) : null}
        </CustomFormField>
        <CustomFormField
          fieldType={FormFieldType.NUMBER}
          control={form.control}
          name='duration'
          label='Süre (dakika)'
          placeholder='Dakika cinsinden süre'
        />
        <CustomFormField
          fieldType={FormFieldType.DATE_PICKER}
          control={form.control}
          name='startsAt'
          label='Başlangıç Tarihi'
        />
        <SubmitButton
          text={editSession ? 'Güncelle' : 'Oluştur'}
          loading={form.formState.isSubmitting}
        />
      </form>
    </Form>
  );
};

export default FocusSessionForm;
