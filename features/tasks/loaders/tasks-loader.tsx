import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';

const TasksLoader = () => {
  return (
    <div className='flex flex-col gap-4'>
      <Skeleton className='h-12 w-full rounded-xl' />
      <Skeleton className='h-12 w-full rounded-xl' />
      <Skeleton className='h-12 w-full rounded-xl' />
      <Skeleton className='h-12 w-full rounded-xl' />
    </div>
  );
};

export default TasksLoader;
