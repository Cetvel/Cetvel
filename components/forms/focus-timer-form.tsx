'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Button } from '../ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { DialogFooter } from '../ui/dialog';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip';
import { Slider } from '../ui/slider';
import { LoaderCircle, Pause, Play, RotateCw, Square } from 'lucide-react';
import { SelectItem } from '../ui/select';
import useSWR from 'swr';
import { fetcher } from '@/lib/utils';
import { Form, FormProvider, useForm } from 'react-hook-form';
import { FocusTimeSchema } from '@/lib/schemas';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import CustomFormField, { FormFieldType } from '../ui/custom-form-field';
import { createPomodoro } from '@/lib/services/pomodoro-service';
import { useToast } from '../ui/use-toast';

type FocusTimerFormValues = z.infer<typeof FocusTimeSchema>;

const FocusTimerForm = () => {
  const [workMinutes, setWorkMinutes] = useState<number>(30);
  const [isPaused, setIsPaused] = useState(true);
  const [secondsLeft, setSecondsLeft] = useState(workMinutes * 60);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const { toast } = useToast();

  const secondsLeftRef = useRef(secondsLeft);
  const isPausedRef = useRef(isPaused);

  const {
    data: tags,
    isLoading: isTagsLoading,
    error: tagsError,
  } = useSWR<Tag[]>('/tag', fetcher);

  const form = useForm<FocusTimerFormValues>({
    resolver: zodResolver(FocusTimeSchema),
    defaultValues: {
      title: '',
      tag: '',
    },
  });

  useEffect(() => {
    const interval = setInterval(() => {
      if (isPausedRef.current) return;
      if (secondsLeftRef.current === 0) {
        handleSubmit();
        return;
      }
      tick();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    secondsLeftRef.current = workMinutes * 60;
    setSecondsLeft(secondsLeftRef.current);
  }, [workMinutes]);

  const initTimer = () => {
    secondsLeftRef.current = workMinutes * 60;
    setSecondsLeft(secondsLeftRef.current);
    setIsPaused(true);
    isPausedRef.current = true;
    setStartDate(null);
  };

  const handlePause = (pause: boolean) => {
    setIsPaused(pause);
    isPausedRef.current = pause;
    if (!pause && !startDate) {
      setStartDate(new Date());
    }
  };

  const handleSubmit = form.handleSubmit(async (data: FocusTimerFormValues) => {
    handlePause(true);
    if (!startDate) {
      toast({
        title: 'Hata',
        description: 'Lütfen önce zamanlayıcıyı başlatın.',
        variant: 'destructive',
      });
      return;
    }

    const endDate = new Date();
    const duration = Math.floor(
      (endDate.getTime() - startDate.getTime()) / 1000 / 60
    );

    const pomodoroData = {
      title: data.title,
      tag: data.tag,
      duration: duration,
      startsAt: startDate.toISOString(),
      endsAt: endDate.toISOString(),
    };

    const success = await createPomodoro(pomodoroData);
    if (success) {
      form.reset();
      initTimer();
    }
  });

  const tick = () => {
    secondsLeftRef.current--;
    setSecondsLeft(secondsLeftRef.current);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  const renderTimerControls = () => (
    <DialogFooter className='!justify-center gap-2 m-0'>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              type='button'
              onClick={() => handlePause(!isPaused)}
              size='icon'
            >
              {isPaused ? <Play size={18} /> : <Pause size={18} />}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <span>{isPaused ? 'Devam et' : 'Duraklat'}</span>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              type='button'
              onClick={initTimer}
              variant='outline'
              size='icon'
            >
              <RotateCw size={18} />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <span>Sayacı sıfırla</span>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      {secondsLeft < workMinutes * 60 && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type='submit'
                variant='destructive'
                size='icon'
                onClick={handleSubmit}
              >
                <Square size={18} />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <span>Bitir ve Kaydet</span>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </DialogFooter>
  );

  return (
    <FormProvider {...form}>
      <Form {...form}>
        <Tabs defaultValue='focus'>
          <TabsList className='w-full grid grid-cols-2'>
            <TabsTrigger value='focus'>Odaklanma</TabsTrigger>
            <TabsTrigger value='settings'>Ayarlar</TabsTrigger>
          </TabsList>
          <TabsContent value='focus'>
            <h2 className='text-5xl font-bold my-10 text-center'>
              {formatTime(secondsLeft)}
            </h2>
            <div className='flex flex-col gap-4 mb-6 items-center w-full'>
              <p className='text-sm text-secondary-content text-center'>
                Lütfen odaklanma süresince odağınızı <br /> çalışmanıza verin!
              </p>
              <CustomFormField
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name='title'
                placeholder='Başlık'
              />
              <CustomFormField
                fieldType={FormFieldType.SELECT}
                control={form.control}
                name='tag'
                placeholder='Etiket seçin'
              >
                {tags ? (
                  tags.map((tag: Tag, i: number) => (
                    <SelectItem key={i} value={tag.value}>
                      {tag.label}
                    </SelectItem>
                  ))
                ) : isTagsLoading ? (
                  <SelectItem value='loading' disabled>
                    <LoaderCircle size={16} className='animate-spin' />
                  </SelectItem>
                ) : tagsError ? (
                  <SelectItem value='error' disabled>
                    Etiketler yüklenemedi
                  </SelectItem>
                ) : null}
              </CustomFormField>
            </div>
            {renderTimerControls()}
          </TabsContent>
          <TabsContent value='settings'>
            <div className='flex flex-col gap-6 mt-6'>
              <div className='form-control'>
                <p className='mb-2'>
                  Odaklanma süresi:{' '}
                  <span className='font-semibold'>{workMinutes} dk</span>
                </p>
                <Slider
                  min={15}
                  max={120}
                  step={5}
                  value={[workMinutes]}
                  onValueChange={(value) => setWorkMinutes(value[0])}
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </Form>
    </FormProvider>
  );
};

export default FocusTimerForm;
