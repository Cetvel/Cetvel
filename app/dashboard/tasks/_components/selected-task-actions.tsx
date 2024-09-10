// SelectedTaskActions.tsx
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { deleteTask, updateTask } from '@/lib/services/task-service';
import Spinner from '@/components/ui/spinner';

interface SelectedTaskActionsProps {
  selectedTasks: Task[];
  onActionComplete: () => void;
}

export function SelectedTaskActions({
  selectedTasks,
  onActionComplete,
}: SelectedTaskActionsProps) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    for (const task of selectedTasks) {
      await deleteTask(task._id);
    }
    onActionComplete();
    setLoading(false);
  };

  const handleMarkComplete = async () => {
    setLoading(true);
    for (const task of selectedTasks) {
      if (task.status !== 'completed') {
        await updateTask(task._id, { ...task, status: 'completed' });
      }
    }
    onActionComplete();
    setLoading(false);
  };

  return (
    <div className='flex space-x-2 mb-4 items-center'>
      <Button
        onClick={handleDelete}
        variant='destructive'
        size={'sm'}
        disabled={loading}
      >
        Seçilenleri Sil
      </Button>
      <Button
        onClick={handleMarkComplete}
        variant='secondary'
        size={'sm'}
        disabled={loading}
      >
        Seçilenleri Tamamla
      </Button>
      {loading && <Spinner />}
    </div>
  );
}
