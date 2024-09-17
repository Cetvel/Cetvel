'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Button } from '../ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { DialogFooter } from '../ui/dialog';
import { Slider } from '../ui/slider';
import { Pause, Play, RotateCw, Square, Volume2, VolumeX } from 'lucide-react';
import { SelectItem } from '../ui/select';
import useSWR from 'swr';
import { fetcher } from '@/lib/utils';
import { Form, FormProvider, useForm } from 'react-hook-form';
import { FocusSessionSchema } from '@/lib/schemas';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import CustomFormField, { FormFieldType } from '../ui/custom-form-field';
import { createFocusSession } from '@/lib/services/focus-service';
import { Switch } from '../ui/switch';
import Spinner from '../ui/spinner';
import { CustomTooltip } from '../global/custom-tooltip';
import { toast } from 'sonner';

type FocusSessionValues = z.infer<typeof FocusSessionSchema>;

interface TimerDisplayProps {
  secondsLeft: number;
  totalSeconds: number;
}

const TimerDisplay: React.FC<TimerDisplayProps> = ({
  secondsLeft,
  totalSeconds,
}) => {
  const percentage = (secondsLeft / totalSeconds) * 100;
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  return (
    <div className='relative w-20 h-20 mx-auto my-10'>
      <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl font-bold'>
        {formatTime(secondsLeft)}
      </div>
    </div>
  );
};

const FocusForge: React.FC = () => {
  const [focusDuration, setFocusDuration] = useState<number>(30);
  const [breakDuration, setBreakDuration] = useState<number>(5);
  const [isPaused, setIsPaused] = useState(true);
  const [secondsLeft, setSecondsLeft] = useState(focusDuration * 60);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [isBreak, setIsBreak] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  const secondsLeftRef = useRef(secondsLeft);
  const isPausedRef = useRef(isPaused);
  const isBreakRef = useRef(isBreak);

  const {
    data: tags,
    isLoading: isTagsLoading,
    error: tagsError,
  } = useSWR<Tag[]>('/tags', fetcher);

  const form = useForm<FocusSessionValues>({
    resolver: zodResolver(FocusSessionSchema),
    defaultValues: {
      title: '',
      tag: '',
      duration: 0,
      startsAt: new Date(),
    },
  });

  useEffect(() => {
    const interval = setInterval(() => {
      if (isPausedRef.current) return;
      if (secondsLeftRef.current === 0) {
        if (isBreakRef.current) {
          setIsBreak(false);
          isBreakRef.current = false;
          secondsLeftRef.current = focusDuration * 60;
          setSecondsLeft(secondsLeftRef.current);
          playSound('focus-start.mp3');
        } else {
          handleSubmit();
          setIsBreak(true);
          isBreakRef.current = true;
          secondsLeftRef.current = breakDuration * 60;
          setSecondsLeft(secondsLeftRef.current);
          playSound('break-start.mp3');
        }
        return;
      }
      tick();
    }, 1000);

    return () => clearInterval(interval);
  }, [focusDuration, breakDuration]);

  const playSound = (soundFile: string) => {
    if (soundEnabled) {
      const audio = new Audio(`/sounds/${soundFile}`);
      audio.play();
    }
  };

  const initTimer = () => {
    secondsLeftRef.current = focusDuration * 60;
    setSecondsLeft(secondsLeftRef.current);
    setIsPaused(true);
    isPausedRef.current = true;
    setStartDate(null);
    setIsBreak(false);
    isBreakRef.current = false;
  };

  const handlePause = (pause: boolean) => {
    setIsPaused(pause);
    isPausedRef.current = pause;
    if (!pause && !startDate) {
      setStartDate(new Date());
    }
    playSound(pause ? 'pause.mp3' : 'resume.mp3');
  };

  const handleSubmit = form.handleSubmit(async (data: FocusSessionValues) => {
    handlePause(true);
    if (!startDate) {
      toast.error('Hata', {
        description: 'Lütfen önce zamanlayıcıyı başlatın.',
      });
      return;
    }

    const endDate = new Date();
    const duration = Math.abs(startDate.getTime() - endDate.getTime()) / 1000;

    const focusSessionData = {
      ...data,
      duration: duration,
      date: startDate,
      startsAt: startDate.toISOString(),
      endsAt: endDate.toISOString(),
    };

    const success = await createFocusSession(focusSessionData);
    if (success) {
      form.reset();
      initTimer();
      playSound('session-complete.mp3');
      toast.success('Başarılı', {
        description: 'Oturum başarıyla kaydedildi.',
      });
    }
  });

  const tick = () => {
    secondsLeftRef.current--;
    setSecondsLeft(secondsLeftRef.current);
  };

  const renderTimerControls = () => (
    <DialogFooter className='!justify-center gap-2 m-0'>
      <CustomTooltip content={isPaused ? 'Başlat' : 'Duraklat'}>
        <Button
          type='button'
          onClick={() => handlePause(!isPaused)}
          size='icon'
        >
          {isPaused ? <Play size={18} /> : <Pause size={18} />}
        </Button>
      </CustomTooltip>
      <CustomTooltip content='Sıfırla'>
        <Button type='button' onClick={initTimer} variant='outline' size='icon'>
          <RotateCw size={18} />
        </Button>
      </CustomTooltip>
      {!isBreak && secondsLeft < focusDuration * 60 && (
        <CustomTooltip content='Bitir'>
          <Button
            type='button'
            onClick={handleSubmit}
            variant='destructive'
            size='icon'
          >
            <Square size={18} />
          </Button>
        </CustomTooltip>
      )}
    </DialogFooter>
  );

  return (
    <FormProvider {...form}>
      <Form {...form}>
        <Tabs defaultValue='focus'>
          <TabsList className='w-full grid grid-cols-2'>
            <TabsTrigger value='focus'>FocusForge</TabsTrigger>
            <TabsTrigger value='settings'>Ayarlar</TabsTrigger>
          </TabsList>
          <TabsContent value='focus'>
            <TimerDisplay
              secondsLeft={secondsLeft}
              totalSeconds={isBreak ? breakDuration * 60 : focusDuration * 60}
            />
            <div className='flex flex-col gap-4 mb-6 items-center w-full'>
              <p className='text-sm text-center'>
                {isBreak
                  ? 'Mola zamanı! Biraz dinlenin.'
                  : 'Lütfen odaklanma süresince odağınızı çalışmanıza verin!'}
              </p>
              {!isBreak && (
                <div className='flex items-center gap-2'>
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
                        <Spinner />
                      </SelectItem>
                    ) : tagsError ? (
                      <SelectItem value='error' disabled>
                        Etiketler yüklenemedi
                      </SelectItem>
                    ) : null}
                  </CustomFormField>
                </div>
              )}
            </div>
            {renderTimerControls()}
          </TabsContent>
          <TabsContent value='settings'>
            <div className='flex flex-col gap-6 mt-6'>
              <div className='form-control'>
                <p className='mb-2'>
                  Odaklanma süresi:{' '}
                  <span className='font-semibold'>{focusDuration} dk</span>
                </p>
                <Slider
                  min={15}
                  max={120}
                  step={5}
                  value={[focusDuration]}
                  onValueChange={(value) => setFocusDuration(value[0])}
                />
              </div>
              <div className='form-control'>
                <p className='mb-2'>
                  Mola süresi:{' '}
                  <span className='font-semibold'>{breakDuration} dk</span>
                </p>
                <Slider
                  min={1}
                  max={30}
                  step={1}
                  value={[breakDuration]}
                  onValueChange={(value) => setBreakDuration(value[0])}
                />
              </div>
              <div className='flex items-center space-x-2'>
                <Switch
                  id='sound-mode'
                  checked={soundEnabled}
                  onCheckedChange={setSoundEnabled}
                />
                <label
                  htmlFor='sound-mode'
                  className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                >
                  Ses bildirimleri
                </label>
                {soundEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </Form>
    </FormProvider>
  );
};

export default FocusForge;
