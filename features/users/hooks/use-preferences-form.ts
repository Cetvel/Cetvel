import { useForm } from 'react-hook-form';
import { useUser } from '../contexts/user-context';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  determineEducationLevel,
  getDefaultGrade,
  getExamValue,
} from '../utils';
import { z } from 'zod';
import { PreferencesSchema } from '@/lib/schemas';
import { axiosInstance } from '@/lib/utils';
import { toast } from 'sonner';
import { mutate } from 'swr';
import { debounce, isEqual } from 'lodash';
import { useCallback, useEffect, useRef } from 'react';

export type PreferencesFormData = z.infer<typeof PreferencesSchema>;

export const usePreferencesForm = () => {
  const { user } = useUser();
  const previousValues = useRef<PreferencesFormData | null>(null);
  const isInitialMount = useRef(true);

  const getInitialValues = (
    user: User | null | undefined
  ): PreferencesFormData => {
    if (!user) {
      return {
        educationLevel: 'Lise',
        field: 'SAY',
        grade: undefined,
        exam: undefined,
      };
    }

    const educationLevel = determineEducationLevel(user.grade);

    return {
      educationLevel,
      grade: user.grade,
      field: educationLevel === 'Lise' ? user.field || 'SAY' : undefined,
      exam: getExamValue(educationLevel, user.exam),
    };
  };

  const form = useForm<PreferencesFormData>({
    resolver: zodResolver(PreferencesSchema),
    defaultValues: getInitialValues(user),
  });

  useEffect(() => {
    if (user && isInitialMount.current) {
      const values = getInitialValues(user);
      Object.entries(values).forEach(([key, value]) => {
        if (value !== undefined) {
          form.setValue(key as keyof PreferencesFormData, value, {
            shouldDirty: false,
            shouldTouch: false,
            shouldValidate: false,
          });
        }
      });
      isInitialMount.current = false;
    }
  }, [user, form]);

  const watchEducationLevel = form.watch('educationLevel');

  useEffect(() => {
    if (!user || isInitialMount.current) return;

    const values = form.getValues();
    const defaultGrade = getDefaultGrade(watchEducationLevel, user.grade);
    const examValue = getExamValue(watchEducationLevel, user.exam);

    const newValues = {
      ...values,
      grade: defaultGrade,
      field: watchEducationLevel === 'Lise' ? values.field || 'SAY' : undefined,
      exam: examValue,
    };

    if (!isEqual(newValues, previousValues.current)) {
      Object.entries(newValues).forEach(([key, value]) => {
        form.setValue(key as keyof PreferencesFormData, value, {
          shouldDirty: true,
          shouldTouch: false,
          shouldValidate: true,
        });
      });
      previousValues.current = newValues;
    }
  }, [watchEducationLevel, user, form]);

  const submitForm = async (values: PreferencesFormData) => {
    if (isEqual(values, previousValues.current)) {
      return;
    }

    const data = {
      educationLevel: values.educationLevel,
      field: values.educationLevel === 'Lise' ? values.field : undefined,
      grade: values.educationLevel === 'Mezun' ? undefined : values.grade,
      exam: getExamValue(values.educationLevel, values.exam),
    };

    try {
      await axiosInstance.put('/settings/preference', data);
      toast.success('Değişiklikler kaydedildi');
      mutate('/users');
      previousValues.current = values;
    } catch (error: any) {
      toast.error('Bir hata oluştu', {
        description:
          error.response?.data?.message || 'Değişiklikleriniz kaydedilemedi.',
      });
    }
  };

  const debouncedSubmit = useCallback(
    debounce((values: PreferencesFormData) => {
      submitForm(values);
    }, 1000),
    []
  );

  useEffect(() => {
    if (isInitialMount.current) return;

    const subscription = form.watch((values) => {
      if (values && !isEqual(values, previousValues.current)) {
        debouncedSubmit(values as PreferencesFormData);
      }
    });

    return () => {
      subscription.unsubscribe();
      debouncedSubmit.cancel();
    };
  }, [form, debouncedSubmit]);

  return {
    form,
    watchEducationLevel,
  };
};
