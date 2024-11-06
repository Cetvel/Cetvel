import React from 'react';
import Banner from './_components/banner';
import FocusTimer from '../../features/focus-sessions/components/focus-timer';
import PageHeader from '@/components/global/page-header';
import TaskList from '@/features/tasks/components/task-list';

const Main = async () => {
  return (
    <>
      <PageHeader title='Panel' />
      <div className='flex flex-col gap-6 h-full'>
        <div className='grid grid-cols-1 sm:grid-cols-2 place-items-stretch lg:grid-cols-7 flex-1 gap-y-6 gap-x-6 items-center'>
          <Banner />
          <FocusTimer />
        </div>
        <TaskList />
      </div>
    </>
  );
};

export default Main;
