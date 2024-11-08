'use client';

import React, { useState, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import CustomFormField, {
  FormFieldType,
} from '@/components/ui/custom-form-field';
import { Form } from '@/components/ui/form';
import { SelectItem } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Card, CardHeader } from '@/components/ui/card';
import { createExam } from '@/features/exams/actions/exam';
import { useModal } from '@/providers/modal-provider';
import Spinner from '@/components/ui/spinner';
import { useUser } from '@/features/users/contexts/user-context';
import { createDynamicSchema } from '../../utils';
import SubjectField from './components/subject-field';
import { examConfigs } from '../../configs';
import NetCalculationModal from '../../components/net-calculation-modal';

const ExamCalculationForm: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [selectedExamType, setSelectedExamType] = useState<ExamType>(
    examConfigs[0].type as ExamType
  );
  const [currentConfig, setCurrentConfig] = useState<ExamConfig>(
    examConfigs[0]
  );
  const [schema, setSchema] = useState(createDynamicSchema(currentConfig));
  const [selectedField, setSelectedField] = useState<string | undefined>(
    undefined
  );

  const { setOpen } = useModal();
  const { user } = useUser();

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      examType: selectedExamType,
    } as z.infer<typeof schema>,
  });

  const filteredExamConfigs = useMemo(() => {
    return examConfigs.filter((config) => {
      if (!config.fields) {
        return true;
      }
      const selectedField = config.fields.find((field) => {
        field.options.includes(user?.field!);
      });
      return selectedField?.options.includes(user?.field!);
    });
  }, [user?.field]);

  const filteredSubjects = useMemo(() => {
    return currentConfig.subjects.filter((subject) => {
      if (!subject.forFields) {
        return true;
      }
      return subject.forFields.includes(user?.field!);
    });
  }, [currentConfig.subjects, user?.field]);

  const handleCalculateClick = () => {
    form.trigger().then((isValid) => {
      if (isValid) {
        setOpen(
          <NetCalculationModal
            currentConfig={currentConfig}
            onConfirm={onSubmit}
            data={form.getValues()}
            errors={form.formState.errors}
          />
        );
      }
    });
  };

  const onSubmit = async (data: z.infer<typeof schema>) => {
    const { examType, ...examData } = data;
    setIsSubmitting(true);

    try {
      const success = await createExam(
        selectedExamType,
        examData,
        selectedField
      );
      if (success) {
        console.log('Sınav başarıyla oluşturuldu');

        const resetValues: any = {
          examName: '',
          examType: selectedExamType,
          solvingTime: currentConfig.totalTime,
          solvingDate: new Date(),
        };

        currentConfig.fields?.forEach((field) => {
          resetValues[field.name] = field.options[0];
        });

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
              <CustomFormField
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name='examName'
                label='Sınav Adı'
                placeholder='Örn: TYT Deneme Sınavı'
              />

              <CustomFormField
                fieldType={FormFieldType.DATE_PICKER}
                control={form.control}
                name='solvingDate'
                label='Sınav Tarihi'
              />

              <CustomFormField
                fieldType={FormFieldType.SELECT}
                control={form.control}
                name='examType'
                label='Sınav Türü'
                onValueChange={(value: string) => {
                  form.setValue('examType', value);
                  setSelectedExamType(value as ExamType);
                  setCurrentConfig(
                    filteredExamConfigs.find((config) => config.type === value)!
                  );
                  setSchema(
                    createDynamicSchema(
                      filteredExamConfigs.find(
                        (config) => config.type === value
                      )!
                    )
                  );
                }}
              >
                {filteredExamConfigs.map((config) => (
                  <SelectItem key={config.type} value={config.type}>
                    {config.label}
                  </SelectItem>
                ))}
              </CustomFormField>

              {currentConfig.fields?.map((field) => (
                <CustomFormField
                  key={field.name}
                  fieldType={FormFieldType.SELECT}
                  control={form.control}
                  name={field.name}
                  label={field.label}
                  onValueChange={(value: string) => {
                    form.setValue(field.name, value);
                    setSelectedField(value);
                  }}
                >
                  {field.options.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option.toUpperCase()}
                    </SelectItem>
                  ))}
                </CustomFormField>
              ))}

              <CustomFormField
                fieldType={FormFieldType.NUMBER}
                control={form.control}
                name='solvingTime'
                label='Toplam Çözüm Süresi (dk)'
                min={0}
                max={currentConfig.totalTime || 180}
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
