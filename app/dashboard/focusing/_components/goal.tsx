import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Plus, Minus, Edit } from 'lucide-react';
import { updateGoal } from '@/lib/services/goal-service';
import { useModal } from '@/providers/modal-provider';
import GoalForm from '@/components/forms/goal-form';
import Modal from '@/components/global/modal';
import { cn } from '@/lib/utils';

const Goal = ({ goal }: { goal: Goal }) => {
  const { _id, title, target, totalUnits, startsAt, endsAt } = goal;
  const { setOpen } = useModal();
  const [currentProgress, setCurrentProgress] = useState(totalUnits);

  const timeoutRef = useRef<NodeJS.Timeout>();

  const debouncedUpdate = useCallback(
    (newProgress: number) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        updateGoal(_id, { totalUnits: newProgress });
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
    const newProgress = Math.min(currentProgress + 1, target);
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
        currentProgress === Number(target) ? 'border-primary' : 'border-border'
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
            disabled={currentProgress === Number(target)}
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
      <Progress value={(currentProgress / target) * 100} className='mb-2' />
      <div className='flex justify-between text-sm text-muted-foreground'>
        <span>
          {currentProgress} / {target}
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
