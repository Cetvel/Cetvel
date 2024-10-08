import PageHeader from '@/components/global/page-header';
import Scheduler from './_components/scheduler';
import React from 'react';
import RecommendedTasks from './_components/recommended-tasks';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import TasksTable from './_components/tasks-table';

const Page = async () => {
  return (
    <>
      <PageHeader title='Görevler' />
      <div className='grid grid-cols-6 gap-6 mb-6'>
        <div className='col-span-4'>
          <Card>
            <CardHeader>
              <h2 className='text-lg font-semibold'>Görevler</h2>
            </CardHeader>
            <CardContent>
              <TasksTable />
            </CardContent>
          </Card>
        </div>
        <div className='col-span-2'>
          <RecommendedTasks />
        </div>
      </div>
    </>
  );
};

export default Page;
