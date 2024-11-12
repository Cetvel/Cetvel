'use client';

import React, { useEffect, useState } from 'react';
import Task from './task';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Reorder } from 'framer-motion';
import { filterTasks } from './task-filter';
import { Card } from '@/components/ui/card';
import useSWR from 'swr';
import { fetcher } from '@/lib/utils';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, CircleSlash2 } from 'lucide-react';
import TagFilter from './tag-filter';
import StatusFilter from './status-filter';
import TagManager from '@/features/tags/components/tag-manager';
import AddTask from './add-task';
import TasksLoader from '../loaders/tasks-loader';
import Error from '@/components/global/error';

const TaskList = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);

  const {
    data: taskData,
    error,
    isLoading,
  } = useSWR<Task[]>('/tasks/today', fetcher, {
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
  });

  useEffect(() => {
    if (taskData) {
      setTasks(taskData);
    }
  }, [taskData]);

  return (
    <>
      <aside className='flex flex-col gap-4 flex-grow lg:col-span-5'>
        <div className='items-start md:items-center gap-4 md:gap-0 justify-between flex flex-col md:flex-row'>
          <div className='flex flex-col md:flex-row md:items-center gap-2 md:gap-6 md:pl-4 flex-1'>
            <h2 className='text-lg font-bold text-secondary-foreground whitespace-nowrap mt-0.5'>
              Bugünün Görevleri
            </h2>
            <div className='flex gap-3 items-center'>
              <TagFilter onChange={setSelectedTag} />
              <StatusFilter onChange={setSelectedStatus} />
              <TagManager />
            </div>
          </div>
          <AddTask />
        </div>

        <Card className='p-2 lg:p-4'>
          {error ? (
            <Error
              message={error}
              title='Görevler yüklenirken bir hata oluştu.'
            />
          ) : isLoading ? (
            <TasksLoader />
          ) : (
            <ScrollArea className='h-[300px]'>
              <Reorder.Group axis='y' values={tasks} onReorder={setTasks}>
                <div className='flex flex-col gap-3'>
                  {tasks.length === 0 ? (
                    <Alert>
                      <AlertCircle size={20} className='mr-2' />
                      <AlertTitle>Görev yok</AlertTitle>
                      <AlertDescription>
                        Yeni bir görev eklemek için butona tıklayın.
                      </AlertDescription>
                    </Alert>
                  ) : (
                    filterTasks(tasks, selectedTag, selectedStatus).map(
                      (task) => <Task key={task._id} task={task} />
                    )
                  )}
                </div>
              </Reorder.Group>
            </ScrollArea>
          )}
        </Card>
      </aside>
    </>
  );
};

export default TaskList;
