import PageHeader from '@/components/global/page-header';
import React from 'react';
import RecommendedTasks from './_components/recommended-tasks';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import TasksTable from './_components/tasks-table';

const Page = async () => {
  return (
    <>
      <PageHeader title='Görevler' />
      <div className='grid grid-cols-1 lg:grid-cols-6 gap-6 mb-6'>
        <div className='lg:col-span-4'>
          <Card className='lg:h-[360px]'>
            <CardHeader>
              <h2 className='text-lg font-semibold'>Görevler</h2>
            </CardHeader>
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
