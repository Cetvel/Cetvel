import PageHeader from '@/components/global/page-header';
import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import TasksTable from '@/features/tasks/tables/tasks/tasks-table';
import RecommendedTasks from '@/features/tasks/components/recommended-tasks';

const Page = async () => {
  return (
    <>
      <PageHeader title='Görevler' />
      <div className='grid grid-cols-1 lg:grid-cols-6 gap-6'>
        <div className='lg:col-span-4'>
          <Card>
            <CardHeader></CardHeader>
            <CardContent>
              <TasksTable />
            </CardContent>
          </Card>
        </div>
        <div className='lg:col-span-2 lg:h-[360px]'>
          <RecommendedTasks />
        </div>
      </div>
    </>
  );
};

export default Page;
