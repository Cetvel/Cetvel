'use client';

import React, { useEffect, useState } from 'react';
import TagManager from './tag-manager';
import Task from './task';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Reorder } from 'framer-motion';
import { filterTasks } from './task-filter';
import AddTask from '@/components/global/add-task';
import TagFilter from '@/components/global/tag-filter';
import StatusFilter from '@/components/global/status-filter';
import { Card } from '@/components/ui/card';
import useSWR from 'swr';
import { fetcher } from '@/lib/utils';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, CircleSlash2 } from 'lucide-react';
import TasksLoader from './tasks-loader';

const Tasktag = () => {
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

        <Card className='p-2 md:p-4'>
          <ScrollArea className='h-[300px] lg:h-[292px] flex-grow overflow-x-hidden'>
            <Reorder.Group axis='y' values={tasks} onReorder={setTasks}>
              <div className='flex flex-col gap-3 w-full'>
                {isLoading && <TasksLoader />}
                {error && (
                  <Alert variant={'destructive'}>
                    <AlertCircle size={18} />
                    <AlertTitle>Hata</AlertTitle>
                    <AlertDescription>
                      Görevler yüklenirken bir hata oluştu.
                    </AlertDescription>
                  </Alert>
                )}
                {tasks.length === 0 && !isLoading && !error && (
                  <Alert>
                    <CircleSlash2 size={18} />
                    <AlertTitle>
                      Hiç görev yok. Yeni bir görev eklemek ister misin?
                    </AlertTitle>
                    <AlertDescription className='text-muted-foreground'>
                      Yeni bir görev eklemek için yukarıdaki butona tıkla.
                    </AlertDescription>
                  </Alert>
                )}
                {tasks.length !== 0 &&
                  filterTasks(tasks, selectedTag, selectedStatus).map(
                    (task) => <Task key={task._id} task={task} />
                  )}
              </div>
            </Reorder.Group>
          </ScrollArea>
        </Card>
      </aside>
    </>
  );
};

export default Tasktag;
