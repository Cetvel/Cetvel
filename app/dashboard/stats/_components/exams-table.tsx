'use client';

import React from 'react';
import useSWR from 'swr';
import { fetcher } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, Plus } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { BaseDataTable } from '@/components/global/data-table';
import { createDynamicColumns, examTypeOptions } from './columns';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const ExamsTable = () => {
  const { data, isLoading, error } = useSWR('/exam', fetcher);
  const initialColumns = createDynamicColumns('tyt');

  if (isLoading) return <Skeleton className='h-36 rounded-xl' />;
  if (error && !isLoading)
    return (
      <Alert variant={'destructive'}>
        <AlertCircle size={16} className='text-destructive' />
        <AlertTitle>Sınavlar yüklenemedi</AlertTitle>
        <AlertDescription>
          Sınavlar yüklenirken bir hata oluştu. Lütfen sayfayı yenile veya daha
          sonra tekrar dene.
        </AlertDescription>
      </Alert>
    );

  return (
    <Card>
      <CardHeader>
        <h2 className='text-lg font-semibold'>Sınavlar</h2>
      </CardHeader>
      <CardContent>
        <BaseDataTable
          data={data}
          columns={initialColumns}
          searchableColumn='examName'
          initialSortColumn='solvingDate'
          initialSortDirection='desc'
          dateColumn='solvingDate'
          pageSize={10}
          selectColumn='examType'
          selectColumnOptions={examTypeOptions}
          createColumnsFunction={createDynamicColumns}
          selectColumnDefaultSelected='tyt'
          enableMultiSelect
          bulkActions={[
            {
              label: 'Seçilenleri sil',
              action: async (selectedRows, clearSelection) => {
                const ids = selectedRows.map((row) => row._id);
                console.log(ids);
                clearSelection();
              },
            },
          ]}
          additionalComponents={
            <Link href={'/dashboard/calculation'}>
              <Button>
                <Plus size={16} />
                <span className='ml-2'>Sınav Ekle</span>
              </Button>
            </Link>
          }
        />
      </CardContent>
    </Card>
  );
};

export default ExamsTable;
