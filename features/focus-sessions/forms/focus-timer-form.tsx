'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DialogFooter } from '@/components/ui/dialog';
import { Slider } from '@/components/ui/slider';
import { Pause, Play, RotateCw, Square, Volume2, VolumeX } from 'lucide-react';
import { SelectItem } from '@/components/ui/select';
import useSWR from 'swr';
import { fetcher } from '@/lib/utils';
import { Form, FormProvider, useForm } from 'react-hook-form';
import { FocusSessionSchema } from '@/lib/schemas';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import CustomFormField, {
  FormFieldType,
} from '@/components/ui/custom-form-field';
import { createFocusSession } from '@/features/focus-sessions/actions';
import { Switch } from '@/components/ui/switch';
import Spinner from '@/components/ui/spinner';
import { CustomTooltip } from '@/components/global/custom-tooltip';
import { toast } from 'sonner';

type FocusSessionValues = z.infer<typeof FocusSessionSchema>;

interface TimerDisplayProps {
  secondsLeft: number;
  totalSeconds: number;
}

const TimerDisplay: React.FC<TimerDisplayProps> = ({ secondsLeft }) => {
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  return (
    <div className='relative w-20 h-20 mx-auto my-6'>
      <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl font-bold'>
        {formatTime(secondsLeft)}
      </div>
    </div>
  );
};

const FocusForge: React.FC = () => {
  const [focusDuration, setFocusDuration] = useState<number>(30);
  const [isPaused, setIsPaused] = useState(true);
  const [secondsLeft, setSecondsLeft] = useState(focusDuration * 60);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const secondsLeftRef = useRef(secondsLeft);
  const isPausedRef = useRef(isPaused);

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

  const handleSubmit = form.handleSubmit(async (data: FocusSessionValues) => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    handlePause(true);
    if (!startDate) {
      toast.error('Hata', {
        description: 'Lütfen önce zamanlayıcıyı başlatın.',
      });
      return;
    }

    const endDate = new Date();
    const duration = focusDuration * 60 - secondsLeftRef.current;

    const focusSessionData = {
      ...data,
      duration: duration,
      date: startDate,
      startsAt: startDate.toISOString(),
      endsAt: endDate.toISOString(),
    };

    try {
      await createFocusSession(focusSessionData);
      form.reset();
      initTimer();
      playSound('session-complete.mp3');
      toast.success('Başarılı', {
        description: 'Oturum başarıyla kaydedildi.',
      });
    } catch (error) {
      toast.error('Hata', {
        description: 'Oturum kaydedilirken bir hata oluştu.',
      });
    } finally {
      setIsSubmitting(false);
    }
  });

  useEffect(() => {
    secondsLeftRef.current = focusDuration * 60;
    setSecondsLeft(secondsLeftRef.current);
  }, [focusDuration]);

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
  }, [focusDuration, handleSubmit]);

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
  };

  const handlePause = (pause: boolean) => {
    setIsPaused(pause);
    isPausedRef.current = pause;
    if (!pause && !startDate) {
      setStartDate(new Date());
    }
    playSound(pause ? 'pause.wav' : 'resume.wav');
  };

  const tick = () => {
    secondsLeftRef.current--;
    setSecondsLeft(secondsLeftRef.current);
  };

  const renderTimerControls = () => (
    <DialogFooter className='!flex !flex-row !justify-center gap-2 m-0'>
      <CustomTooltip content={isPaused ? 'Başlat' : 'Duraklat'}>
        <Button
          type='button'
          onClick={() => handlePause(!isPaused)}
          size='icon'
          disabled={isSubmitting}
        >
          {isPaused ? <Play size={18} /> : <Pause size={18} />}
        </Button>
      </CustomTooltip>
      <CustomTooltip content='Sıfırla'>
        <Button
          type='button'
          onClick={initTimer}
          variant='outline'
          size='icon'
          disabled={isSubmitting}
        >
          <RotateCw size={18} />
        </Button>
      </CustomTooltip>
      {secondsLeft < focusDuration * 60 && (
        <CustomTooltip content='Bitir'>
          <Button
            type='button'
            onClick={handleSubmit}
            variant='destructive'
            size='icon'
            disabled={isSubmitting}
          >
            {isSubmitting ? <Spinner /> : <Square size={18} />}
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
            <TabsTrigger value='focus'>Odaklanma</TabsTrigger>
            <TabsTrigger value='settings'>Ayarlar</TabsTrigger>
          </TabsList>
          <TabsContent value='focus'>
            <TimerDisplay
              secondsLeft={secondsLeft}
              totalSeconds={focusDuration * 60}
            />
            <div className='flex flex-col gap-4 mb-6 items-center w-full'>
              <p className='text-sm text-center'>
                Lütfen odaklanma süresince odağınızı çalışmanıza verin!
              </p>

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
