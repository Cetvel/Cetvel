import { Card, CardContent, CardHeader } from '@/components/ui/card';
import CustomFormField, {
  FormFieldType,
} from '@/components/ui/custom-form-field';
import { SubjectConfig } from '@/features/exams/types';

const SubjectField: React.FC<SubjectConfig & { control: any }> = ({
  control,
  name,
  maxQuestions,
  label,
}) => (
  <Card>
    <CardHeader>
      <h3 className='font-semibold'>{label}</h3>
    </CardHeader>
    <CardContent>
      <div className='grid grid-cols-3 gap-4'>
        <CustomFormField
          fieldType={FormFieldType.NUMBER}
          control={control}
          name={`${name}.solvingTime`}
          label='Çözüm Süresi'
          min={0}
          max={180}
          placeholder='Dakika'
        />
        <CustomFormField
          fieldType={FormFieldType.NUMBER}
          control={control}
          name={`${name}.correct`}
          label='Doğru'
          min={0}
          max={maxQuestions}
          placeholder='0'
        />
        <CustomFormField
          fieldType={FormFieldType.NUMBER}
          control={control}
          name={`${name}.wrong`}
          label='Yanlış'
          min={0}
          max={maxQuestions}
          placeholder='0'
        />
      </div>
    </CardContent>
  </Card>
);

export default SubjectField;
