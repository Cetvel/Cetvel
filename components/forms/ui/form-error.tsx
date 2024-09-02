import React from 'react';
import { AlertCircle, X } from 'lucide-react';
import { Alert, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';

export interface ErrorMessage {
  field: string;
  message: string;
}

interface FormErrorProps {
  errors: ErrorMessage[];
}

const translateFieldName = (field: string): string => {
  const translations: Record<string, string> = {
    social: 'Sosyal Bilimler',
    science: 'Fen Bilimleri',
    turkish: 'Türkçe',
    math: 'Matematik',
    correct: 'Doğru Sayısı',
    root: 'Toplam Soru Sayısı',
  };

  return field
    .split('.')
    .map((part) => translations[part] || part)
    .join(' ');
};

const formatErrorMessage = (field: string, message: string): string => {
  const translatedField = translateFieldName(field);
  return `${translatedField}: ${message}`;
};

const FormError: React.FC<FormErrorProps> = ({ errors }) => {
  if (errors.length === 0) return null;

  const formattedErrors = errors.map((error) =>
    formatErrorMessage(error.field, error.message)
  );

  return (
    <Alert variant={'destructive'} className='relative'>
      <AlertTitle className='flex items-center gap-2'>
        <AlertCircle size={20} />
        Hata
      </AlertTitle>
      <div className='mt-2'>
        <ul className='list-disc list-inside pl-2'>
          {formattedErrors.map((message, index) => (
            <li key={index} className='text-sm text-red-700'>
              {message}
            </li>
          ))}
        </ul>
      </div>
    </Alert>
  );
};

export default FormError;
