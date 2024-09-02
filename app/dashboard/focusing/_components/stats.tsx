'use client';

import { CardContent, CardFooter } from '@/components/ui/card';
import React from 'react';
import { FocusingStatsChart } from './stats-chart';
import { AlertCircle, TrendingUp } from 'lucide-react';
import useSWR from 'swr';
import { fetcher, formatMinutesToHours } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

type Data = {
  todayStatistics: {
    totalDuration: number;
    totalPomodoros: number;
  };
  lastWeekStatistics: {
    totalDuration: number;
    averageDuration: number;
    totalPomodoros: number;
  };
  chartData: {
    day: string;
    hours: number;
  }[];
};

const Statistics = () => {
  const { data, isLoading, error } = useSWR<Data>('/pomodoro/today', fetcher);

  if (isLoading) {
    return (
      <CardContent className='flex flex-col gap-4'>
        <Skeleton className='h-6' />
        <Skeleton className='h-6' />
        <Skeleton className='h-6' />
        <Skeleton className='h-6' />
        <Skeleton className='h-36 mt-4' />
      </CardContent>
    );
  }

  if (error && !isLoading) {
    return (
      <Alert variant={'destructive'}>
        <AlertCircle size={18} />
        <AlertTitle>Bir hata oluştu.</AlertTitle>
        <AlertDescription>
          Lütfen sayfayı yenileyin ya da daha sonra tekrar deneyin.
        </AlertDescription>
      </Alert>
    );
  }

  if (data) {
    return (
      <>
        <CardContent className='flex flex-col gap-2'>
          <div className='flex items-center justify-between'>
            <p>Bugünkü toplam:</p>
            <p>{formatMinutesToHours(data.todayStatistics.totalDuration)}</p>
          </div>
          <div className='flex items-center justify-between'>
            <p>Haftalık ortalama:</p>
            <p>
              {formatMinutesToHours(data.lastWeekStatistics.averageDuration)}
            </p>
          </div>
          <div className='flex items-center justify-between'>
            <p>Son 7 gündeki toplam oturum:</p>
            <p>{data.lastWeekStatistics.totalPomodoros} oturum</p>
          </div>
          <div className='flex items-center justify-between'>
            <p>Bugünkü toplam oturum:</p>
            <p>{data.todayStatistics.totalPomodoros} oturum</p>
          </div>
        </CardContent>
        <CardFooter>
          <FocusingStatsChart chartData={data.chartData} />
        </CardFooter>
      </>
    );
  }
};

export default Statistics;
