'use client';

import { CardContent, CardFooter } from '@/components/ui/card';
import React from 'react';
import Goal from './goal';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useModal } from '@/providers/modal-provider';
import GoalForm from '@/features/goals/forms/goal-form';
import Modal from '@/components/global/modal';
import { AlertCircle, CircleSlash2 } from 'lucide-react';
import useSWR from 'swr';
import { fetcher } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const Goals = () => {
  const { setOpen } = useModal();
  const { data: goals, isLoading, error } = useSWR('/goals', fetcher);

  if (isLoading) {
    return (
      <CardContent className='flex flex-col gap-2'>
        <Skeleton className='h-20 w-full rounded-xl' />
        <Skeleton className='h-20 w-full rounded-xl' />
        <Skeleton className='h-20 w-full rounded-xl' />
        <Skeleton className='h-20 w-full rounded-xl' />
      </CardContent>
    );
  }

  if (error && !isLoading) {
    return (
      <CardContent className='flex flex-col gap-2'>
        <Alert variant={'destructive'}>
          <AlertCircle size={18} />
          <AlertTitle>Bir hata oluştu.</AlertTitle>
          <AlertDescription>
            Lütfen sayfayı yenileyin ya da daha sonra tekrar deneyin.
          </AlertDescription>
        </Alert>
      </CardContent>
    );
  }

  return (
    <>
      <CardContent>
        <ScrollArea className='h-[300px]'>
          <div className='flex flex-col space-y-4'>
            {goals.length ? (
              goals?.map((goal: Goal) => <Goal key={goal._id} goal={goal} />)
            ) : (
              <Alert>
                <CircleSlash2 size={18} />
                <AlertTitle>Hedef yok.</AlertTitle>
                <AlertDescription>
                  Yeni bir hedef eklemek için butona tıklayın.
                </AlertDescription>
              </Alert>
            )}
          </div>
        </ScrollArea>
      </CardContent>
      <CardFooter className='justify-self-end flex flex-col items-stretch'>
        <Button
          variant={'secondary'}
          onClick={() =>
            setOpen(
              <Modal title='Hedef ekle'>
                <GoalForm />
              </Modal>
            )
          }
        >
          Yeni hedef ekle
        </Button>
      </CardFooter>
    </>
  );
};

export default Goals;
