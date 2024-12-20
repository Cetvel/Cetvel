'use client';

import React, { useState } from 'react';
import { AnimatePresence, Reorder, motion } from 'framer-motion';
import { useModal } from '@/providers/modal-provider';
import { cn } from '@/lib/utils';
import Modal from '@/components/global/modal';
import TaskForm from '@/features/tasks/forms/task-form';
import { Check, ChevronRight } from 'lucide-react';

type Props = {
  task: any;
};

const Task = ({ task }: Props) => {
  const { setOpen } = useModal();
  const [isDragging, setIsDragging] = useState(false);

  return (
    <AnimatePresence>
      <Reorder.Item
        value={task}
        exit={{
          opacity: 0,
        }}
        whileDrag={{
          rotate: -3.2,
        }}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={() => setIsDragging(false)}
      >
        <motion.button
          className={cn(
            'flex w-full text-sm md:text-base items-center gap-2 px-4 lg:px-6 py-3 justify-between border rounded-xl hover:bg-secondary transition-colors',
            {
              'bg-secondary': task.status === 'completed',
            }
          )}
          onClick={() => {
            if (!isDragging)
              setOpen(
                <Modal title={task.title}>
                  <TaskForm type='edit' task={task} />
                </Modal>
              );
          }}
        >
          <h3 className='text-start flex gap-2 items-center'>
            <span
              className={cn({
                'line-through': task.status === 'completed',
              })}
            >
              {task.title}
            </span>
            {task.status === 'completed' && (
              <span className='text-primary'>
                <Check className='h-5 w-5' />
              </span>
            )}
          </h3>

          <div>
            <div className='text-secondary-content flex gap-1 lg:gap-4 items-center'>
              <p className='text-base-content mt-[0.5px] whitespace-nowrap'></p>
              <ChevronRight className='text-secondary-content w-4 h-4' />
            </div>
          </div>
        </motion.button>
      </Reorder.Item>
    </AnimatePresence>
  );
};

export default Task;
