'use client';

import React, { useMemo, useState } from 'react';
import useSWR from 'swr';
import { fetcher } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, Plus, Trash } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { BaseDataTable } from '@/components/global/data-table';
import { createDynamicColumns } from './columns';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { deleteManyExams } from '@/features/exams/actions/exam';
import { useUser } from '@/features/users/contexts/user-context';

const ExamsTable = () => {
  const { user } = useUser();
  const { data, isLoading, error } = useSWR('/exams', fetcher);
  const aytField = user?.field as string;

  const studyField: StudyField = useMemo(() => {
    const userStudyField = user?.studyField as string;
    return userStudyField
      ? (StudyField as any)[userStudyField]
      : StudyField.YKS;
  }, [user?.studyField]);

  const availableExams = useMemo(
    () => getAvailableExams(studyField),
    [studyField]
  );

  const examTypeOptions = useMemo(
    () =>
      availableExams.map((exam) => ({
        value: exam.id.toUpperCase(),
        label: exam.name,
      })),
    [availableExams]
  );

  const [selectedExamType, setSelectedExamType] = useState<ExamType>(
    (examTypeOptions[0]?.value as ExamType) || 'TYT'
  );

  const columns = useMemo(
    () => createDynamicColumns(selectedExamType, aytField),
    [selectedExamType, aytField]
  );

  const filteredData = useMemo(() => {
    if (!data) return [];
    return data.filter((exam: any) => exam.examType === selectedExamType);
  }, [data, selectedExamType]);

  if (isLoading) return <Skeleton className='h-36 rounded-xl' />;
  if (error && !isLoading) {
    console.error(JSON.stringify(error));

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
  }

  return (
    <Card>
      <CardHeader>
        <h2 className='text-lg font-semibold'>Sınavlar</h2>
      </CardHeader>
      <CardContent>
        <BaseDataTable
          data={filteredData}
          columns={columns}
          searchableColumn='examName'
          initialSortColumn='solvingDate'
          initialSortDirection='desc'
          dateColumn='solvingDate'
          pageSize={10}
          selectColumn='examType'
          selectColumnOptions={examTypeOptions}
          createColumnsFunction={createDynamicColumns}
          selectColumnDefaultSelected={selectedExamType}
          onSelectColumnChange={(value) =>
            setSelectedExamType(value as ExamType)
          }
          enableMultiSelect
          bulkActions={[
            {
              icon: <Trash size={14} />,
              label: 'Seçilenleri sil',
              variant: 'destructive',
              action: async (selectedRows, clearSelection) => {
                const ids = selectedRows.map((row) => row._id);
                await deleteManyExams(ids);
                clearSelection();
              },
            },
          ]}
          additionalComponents={
            <Link href={'/dashboard/calculation'}>
              <Button>
                <Plus size={16} />
                Sınav Ekle
              </Button>
            </Link>
          }
        />
      </CardContent>
    </Card>
  );
};

export default ExamsTable;
