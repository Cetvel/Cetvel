import { cn } from '@/lib/utils';
import { LoaderCircle } from 'lucide-react';
import React from 'react';

type SpinnerProps = {
  className?: string;
  size?: number;
};

const Spinner = ({ className, size = 18 }: SpinnerProps) => {
  return (
    <LoaderCircle className={cn('animate-spin', className)} size={size}>
      Spinner
    </LoaderCircle>
  );
};

export default Spinner;
