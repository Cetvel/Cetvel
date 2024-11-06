import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Plus, Minus, Edit } from 'lucide-react';
import { updateGoal } from '@/features/goals/actions';
import { useModal } from '@/providers/modal-provider';
import GoalForm from '@/features/goals/forms/goal-form';
import Modal from '@/components/global/modal';
import { cn } from '@/lib/utils';

const Goal = ({ goal }: { goal: Goal }) => {
  const { _id, title, totalUnits, completedUnits, startsAt, endsAt } = goal;
  const { setOpen } = useModal();
  const [currentProgress, setCurrentProgress] = useState(completedUnits);

  const timeoutRef = useRef<NodeJS.Timeout>();

  const debouncedUpdate = useCallback(
    (newProgress: number) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        updateGoal(_id, { completedUnits: newProgress });
      }, 500);
    },
    [_id]
  );

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleIncrement = () => {
    const newProgress = Math.min(currentProgress + 1, totalUnits);
    setCurrentProgress(newProgress);
    debouncedUpdate(newProgress);
  };

  const handleDecrement = () => {
    const newProgress = Math.max(currentProgress - 1, 0);
    setCurrentProgress(newProgress);
    debouncedUpdate(newProgress);
  };

  return (
    <div
      className={cn(
        'p-4 bg-card rounded-lg border group',
        currentProgress === totalUnits ? 'border-primary' : 'border-border'
      )}
    >
      <div className='flex items-center justify-between mb-2'>
        <h3 className='font-semibold'>{title}</h3>
        <div className='flex space-x-2 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity'>
          <Button
            size='icon-sm'
            onClick={handleDecrement}
            disabled={currentProgress === 0}
          >
            <Minus className='h-4 w-4' />
          </Button>
          <Button
            disabled={currentProgress === totalUnits}
            size='icon-sm'
            onClick={handleIncrement}
          >
            <Plus className='h-4 w-4' />
          </Button>
          <Button
            size='icon-sm'
            variant={'outline'}
            onClick={() =>
              setOpen(
                <Modal title='Hedefi Düzenle'>
                  <GoalForm initialData={goal} />
                </Modal>
              )
            }
          >
            <Edit className='h-4 w-4' />
          </Button>
        </div>
      </div>
      <Progress value={(currentProgress / totalUnits) * 100} className='mb-2' />
      <div className='flex justify-between text-sm text-muted-foreground'>
        <span>
          {currentProgress} / {totalUnits}
        </span>
        <span>
          {new Date(startsAt).toLocaleDateString()} -{' '}
          {new Date(endsAt).toLocaleDateString()}
        </span>
      </div>
    </div>
  );
};

export default Goal;
