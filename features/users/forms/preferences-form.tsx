'use client';

import Spinner from '@/components/ui/spinner';
import { useUser } from '../contexts/user-context';
import { usePreferencesForm } from '../hooks/use-preferences-form';
import Error from '@/components/global/error';
import { FormProvider } from 'react-hook-form';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import DynamicFormField, {
  FormFieldType,
} from '@/components/ui/dynamic-form-field';
import { educationLevels, exams, fields, gradeOptions } from '../configs';
import { SelectItem } from '@/components/ui/select';
import { ImagePreferences } from '../components/image-preferences';
import { FormControl } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

const PreferencesForm = () => {
  const { user, isUserLoading, isUserError } = useUser();
  const { form, watchEducationLevel } = usePreferencesForm();

  if (isUserLoading) return <Spinner size={24} />;
  if (isUserError)
    return (
      <Error
        title='Bir hata oluştu'
        message={isUserError.message || 'Beklenmedik sunucu hatası'}
      />
    );
  if (!user) return null;

  return (
    <div className='space-y-6'>
      <FormProvider {...form}>
        <form className='space-y-6'>
          <Card className='w-full'>
            <CardHeader>
              <CardTitle>Eğitim Bilgileri</CardTitle>
              <CardDescription>
                Eğitim bilgilerini buradan güncelleyebilirsin.
              </CardDescription>
            </CardHeader>
            <CardContent className='gap-6 grid grid-cols-1 lg:grid-cols-3'>
              <DynamicFormField
                fieldType={FormFieldType.SELECT}
                control={form.control}
                name='educationLevel'
                label='Eğitim Seviyen'
              >
                {educationLevels.map((level) => (
                  <SelectItem key={level} value={level}>
                    {level}
                  </SelectItem>
                ))}
              </DynamicFormField>

              {watchEducationLevel === 'Lise' && (
                <DynamicFormField
                  fieldType={FormFieldType.SELECT}
                  control={form.control}
                  name='field'
                  label='Alanın'
                >
                  {fields.map((field) => (
                    <SelectItem key={field.value} value={field.value}>
                      {field.label}
                    </SelectItem>
                  ))}
                </DynamicFormField>
              )}

              {watchEducationLevel !== 'Mezun' && (
                <DynamicFormField
                  fieldType={FormFieldType.SELECT}
                  control={form.control}
                  name='grade'
                  label='Sınıfın'
                >
                  {gradeOptions[watchEducationLevel]?.map((grade) => (
                    <SelectItem key={grade} value={grade.toString()}>
                      {grade}
                    </SelectItem>
                  ))}
                </DynamicFormField>
              )}

              {watchEducationLevel === 'Mezun' && (
                <DynamicFormField
                  fieldType={FormFieldType.SELECT}
                  control={form.control}
                  name='exam'
                  label='Sınav türün'
                >
                  {exams.map((exam, i) => (
                    <SelectItem key={i} value={exam}>
                      {exam}
                    </SelectItem>
                  ))}
                </DynamicFormField>
              )}
            </CardContent>
          </Card>
        </form>
      </FormProvider>

      <Card className='w-full'>
        <CardHeader>
          <CardTitle>Arayüz Tercihleri</CardTitle>
          <CardDescription>
            Arayüz tercihlerini buradan güncelleyebilirsin.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ImagePreferences user={user} />
        </CardContent>
      </Card>
    </div>
  );
};

export default PreferencesForm;
