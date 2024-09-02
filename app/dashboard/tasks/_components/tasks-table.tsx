'use client';

import React from 'react';
import { columns } from './columns';
import useSWR from 'swr';
import { fetcher } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import AddTask from '@/components/global/add-task';
import { BaseDataTable } from '@/components/global/data-table';

const taskStatusOptions = [
  {
    value: 'incomplete',
    label: 'Aktif',
  },
  {
    value: 'completed',
    label: 'Tamamlandı',
  },
];

const TasksTable = () => {
  const { data: tasks, isLoading, error } = useSWR('/todo', fetcher);

  if (isLoading) return <Skeleton className='h-36 rounded-xl' />;
  if (error && !isLoading)
    return (
      <Alert variant={'destructive'}>
        <AlertCircle size={16} className='text-destructive' />
        <AlertTitle>Görevler yüklenemedi</AlertTitle>
        <AlertDescription>
          Görevler yüklenirken bir hata oluştu. Lütfen sayfayı yenile veya daha
          sonra tekrar dene.
        </AlertDescription>
      </Alert>
    );

  return (
    <>
      <BaseDataTable
        data={tasks}
        columns={columns}
        searchableColumn='title'
        dateColumn='startsAt'
        pageSize={10}
        initialSortColumn='startsAt'
        initialSortDirection='desc'
        selectColumn='status'
        selectColumnOptions={taskStatusOptions}
        filterComponent={<AddTask />}
      />
    </>
  );
};

export default TasksTable;
