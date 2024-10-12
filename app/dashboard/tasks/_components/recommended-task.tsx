import React from 'react';
import { Button } from '@/components/ui/button';
import { useModal } from '@/providers/modal-provider';
import { ChevronRight } from 'lucide-react';
import TaskForm from '@/components/forms/task-form';
import Modal from '@/components/global/modal';

type Props = {
  task: {
    title: string;
    tag: string;
  };
};

const truncateTitle = (title: string, maxLength: number = 40) => {
  if (title.length <= maxLength) return title;
  return `${title.substring(0, maxLength)}...`;
};

const RecommendedTask = ({ task }: Props) => {
  const { setOpen } = useModal();

  const formTask = {
    _id: new Date().getTime().toString(),
    status: 'incomplete',
    title: task.title,
    tag: task.tag,
    startsAt: new Date(),
    endsAt: new Date(),
  };

  return (
    <Button
      variant='outline'
      className='justify-between w-full'
      onClick={() =>
        setOpen(
          <Modal title='Görev oluştur'>
            <TaskForm task={formTask} />
          </Modal>
        )
      }
    >
      <h5 className='font-medium text-left truncate'>
        {truncateTitle(task.title)}
      </h5>
      <ChevronRight className='w-4 h-4 text-secondary-content flex-shrink-0' />
    </Button>
  );
};

export default RecommendedTask;
