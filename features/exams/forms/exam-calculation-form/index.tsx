'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import DynamicFormField, {
  FormFieldType,
} from '@/components/ui/dynamic-form-field';
import { Form } from '@/components/ui/form';
import { SelectItem } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Card, CardHeader } from '@/components/ui/card';
import { createExam } from '@/features/exams/actions';
import { useModal } from '@/providers/modal-provider';
import Spinner from '@/components/ui/spinner';
import { useUser } from '@/features/users/contexts/user-context';
import { createDynamicSchema } from '../../utils';
import SubjectField from './components/subject-field';
import { examConfigs } from '../../configs';
import NetCalculationModal from '../../components/net-calculation-modal';

const ExamCalculationForm: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { setOpen } = useModal();
  const { user } = useUser();

  const [selectedExamType, setSelectedExamType] = useState<ExamType>(
    examConfigs[0].type as ExamType
  );
  const [currentConfig, setCurrentConfig] = useState<ExamConfig>(
    examConfigs[0]
  );

  const [selectedField, setSelectedField] = useState<string | undefined>(
    user?.field || undefined
  );
  const [schema, setSchema] = useState(
    createDynamicSchema(currentConfig, selectedField)
  );

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      examType: selectedExamType,
      solvingTime: currentConfig.totalTime,
      ...(currentConfig.field && {
        [currentConfig.field.name]: user?.field,
      }),
    } as z.infer<typeof schema>,
  });

  const filteredExamConfigs = useMemo(() => {
    return examConfigs.filter((config) => {
      if (!config.type) {
        return true;
      }

      if (user?.exam === 'YKS') {
        return config.type === 'TYT' || config.type === 'AYT';
      }

      return config.type === user?.exam;
    });
  }, [user?.exam]);

  const filteredSubjects = useMemo(() => {
    return currentConfig.subjects.filter((subject) => {
      if (!subject.forFields) {
        return true;
      }
      return subject.forFields.includes(selectedField || user?.field!);
    });
  }, [currentConfig.subjects, selectedField, user?.field]);

  useEffect(() => {
    const subscription = form.watch(() => {
      form.clearErrors();
    });
    return () => subscription.unsubscribe();
    setSchema(createDynamicSchema(currentConfig, selectedField));
  }, [form, currentConfig, selectedField]);

  const handleCalculateClick = async () => {
    try {
      const isValid = await form.trigger();
      if (isValid) {
        const formData = form.getValues();
        setOpen(
          <NetCalculationModal
            currentConfig={currentConfig}
            onConfirm={onSubmit}
            data={formData}
            errors={form.formState.errors}
          />
        );
      } else {
        console.log('Form validation errors:', form.formState.errors);
      }
    } catch (error) {
      console.error('Form validation error:', error);
    }
  };

  const onSubmit = async (data: z.infer<typeof schema>) => {
    const { examType, ...examData } = data;
    setIsSubmitting(true);

    try {
      const success = await createExam(
        selectedExamType,
        examData,
        selectedExamType === 'AYT' ? selectedField : undefined
      );
      if (success) {
        const resetValues: any = {
          examName: '',
          examType: selectedExamType,
          solvingTime: currentConfig.totalTime,
          solvingDate: new Date(),
          ...(currentConfig.field && {
            [currentConfig.field.name]: selectedField || user?.field,
          }),
        };

        currentConfig.subjects.forEach((subject) => {
          resetValues[subject.name] = {
            solvingTime: 0,
            correct: 0,
            wrong: 0,
          };
        });

        form.reset(resetValues);
        form.clearErrors();
      }
    } catch (error) {
      console.error('Sınav oluşturma hatası:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
        <Card>
          <CardHeader>
            <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4'>
              <DynamicFormField
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name='examName'
                label='Sınav Adı'
                placeholder='Örn: TYT Deneme Sınavı'
              />

              <DynamicFormField
                fieldType={FormFieldType.DATE_PICKER}
                control={form.control}
                name='solvingDate'
                label='Sınav Tarihi'
              />

              <DynamicFormField
                fieldType={FormFieldType.SELECT}
                control={form.control}
                name='examType'
                label='Sınav Türü'
                onValueChange={(value: string) => {
                  const newConfig = filteredExamConfigs.find(
                    (config) => config.type === value
                  )!;

                  setSelectedExamType(value as ExamType);
                  setCurrentConfig(newConfig);
                  setSchema(createDynamicSchema(newConfig));

                  form.reset({
                    examType: value,
                    solvingTime: newConfig.totalTime,
                    ...(newConfig.field && {
                      [newConfig.field.name]: selectedField || user?.field,
                    }),
                  });
                }}
              >
                {filteredExamConfigs.map((config) => (
                  <SelectItem key={config.type} value={config.type}>
                    {config.label}
                  </SelectItem>
                ))}
              </DynamicFormField>

              {currentConfig.field && (
                <DynamicFormField
                  key={currentConfig.field.name}
                  fieldType={FormFieldType.SELECT}
                  control={form.control}
                  name={currentConfig.field.name}
                  label={currentConfig.field.label}
                  onValueChange={(value: string) => {
                    setSelectedField(value);
                  }}
                >
                  {currentConfig.field.options.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </DynamicFormField>
              )}

              <DynamicFormField
                fieldType={FormFieldType.NUMBER}
                control={form.control}
                name='solvingTime'
                label='Toplam Çözüm Süresi (dk)'
                min={0}
                max={currentConfig.totalTime}
              />
            </div>
          </CardHeader>
        </Card>

        <div className='grid grid-cols-1 xl:grid-cols-2 gap-6'>
          {filteredSubjects.map((subject) => (
            <SubjectField
              key={subject.name}
              control={form.control}
              {...subject}
            />
          ))}
        </div>

        <div className='flex items-center gap-4 justify-end'>
          <Button
            type='button'
            onClick={handleCalculateClick}
            disabled={isSubmitting}
          >
            {isSubmitting && <Spinner />}
            Hesapla
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ExamCalculationForm;
