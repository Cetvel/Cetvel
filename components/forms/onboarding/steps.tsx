// components/forms/steps/EducationStep.tsx
import React from 'react';
import { useFormContext } from 'react-hook-form';
import CustomFormField, {
  FormFieldType,
} from '@/components/ui/custom-form-field';
import { SelectItem } from '@/components/ui/select';

export const EducationStep: React.FC = () => {
  const { control, watch } = useFormContext();
  const watchEducationLevel = watch('educationLevel');

  return (
    <>
      <CustomFormField
        fieldType={FormFieldType.SELECT}
        control={control}
        name='educationLevel'
        label='Eğitim seviyen'
      >
        {educationLevels.map((level, i) => (
          <SelectItem key={i} value={level}>
            {level}
          </SelectItem>
        ))}
      </CustomFormField>

      {watchEducationLevel !== 'Mezun' && (
        <CustomFormField
          fieldType={FormFieldType.SELECT}
          control={control}
          name='grade'
          label='Sınıfın'
        >
          {gradeOptions[watchEducationLevel as keyof typeof gradeOptions]?.map(
            (grade, i) => (
              <SelectItem key={i} value={grade.toString()}>
                {grade}. Sınıf
              </SelectItem>
            )
          )}
        </CustomFormField>
      )}

      {watchEducationLevel === 'Lise' && (
        <CustomFormField
          fieldType={FormFieldType.SELECT}
          control={control}
          name='field'
          label='Alanın'
        >
          {fields.map((field, i) => (
            <SelectItem key={i} value={field.value}>
              {field.label}
            </SelectItem>
          ))}
        </CustomFormField>
      )}

      {watchEducationLevel === 'Mezun' && (
        <CustomFormField
          fieldType={FormFieldType.SELECT}
          control={control}
          name='courseSubjects'
          label='Sınav türün'
        >
          {exams.map((exam, i) => (
            <SelectItem key={i} value={exam}>
              {exam}
            </SelectItem>
          ))}
        </CustomFormField>
      )}
    </>
  );
};

import { FormDescription, FormLabel } from '@/components/ui/form';
import { educationLevels } from '@/constants';

export const NotificationStep: React.FC = () => {
  const { control } = useFormContext();

  return (
    <div className='form-line'>
      <div className='flex flex-col space-y-0.5 flex-grow'>
        <FormLabel>Bildirimler</FormLabel>
        <FormDescription>
          Etütlerin ve görevlerin hakkında hatırlatıcı ve diğer bildirimleri
          almak ister misin?
        </FormDescription>
      </div>
      <CustomFormField
        fieldType={FormFieldType.SWITCH}
        control={control}
        name='notifications'
      />
    </div>
  );
};

interface InterfaceStepProps {}

export const InterfaceStep: React.FC<InterfaceStepProps> = ({}) => {
  return (
    <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>Resim Seçimi</div>
  );
};
