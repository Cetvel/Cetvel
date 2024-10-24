import React from 'react';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { AlertCircle } from 'lucide-react';

type Props = {
  title: string;
  message: string;
};

const Error = ({ message, title }: Props) => {
  return (
    <Alert variant={'destructive'}>
      <AlertCircle className='text-destructive' size={18} />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );
};

export default Error;
