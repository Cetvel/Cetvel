'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Sparkles, RotateCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import RecommendedTask from './recommended-task';
import { CustomTooltip } from '@/components/global/custom-tooltip';
import Spinner from '@/components/ui/spinner';
import { ScrollArea } from '@/components/ui/scroll-area';
import { fadeIn } from '@/lib/motion';
import { useUser } from '@/features/users/contexts/user-context';
import { getRecommendedTasks } from '../actions';
import axios from 'axios';
import { axiosInstance } from '@/lib/utils';

const RecommendedTasks: React.FC = () => {
  const [tasks, setTasks] = useState<Task[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isValidating, setIsValidating] = useState(false);
  const { user } = useUser();

  const handleFetchTasks = async () => {
    try {
      setError(null);
      setIsValidating(true);

      if (!user?.apiTenancy || user.apiTenancy <= 0) {
        setError('Günlük öneri hakkınız kalmadı.');
        return;
      }

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000);

      const fetchedTasks = await getRecommendedTasks({
        signal: controller.signal,
        axiosInstance,
      });

      clearTimeout(timeoutId);
      setTasks(fetchedTasks);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.code === 'ECONNABORTED') {
          setError('İstek zaman aşımına uğradı, lütfen tekrar deneyin.');
        } else {
          setError(error.message || 'Önerilen görevler alınamadı.');
        }
      } else {
        setError('Beklenmeyen bir hata oluştu.');
      }
    } finally {
      setIsValidating(false);
    }
  };

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  console.log(tasks);

  return (
    <Card className='relative'>
      <CardHeader className='flex items-center flex-row justify-between'>
        <h3 className='mt-1 flex'>
          <Sparkles className='w-6 h-6 mr-2 text-primary' />
          Önerilen görevler
        </h3>

        {tasks && !isValidating && (
          <CustomTooltip
            content={
              /* @ts-ignore */
              user?.apiTenancy > 0
                ? `Günlük öneri hakkınız: ${user?.apiTenancy}`
                : 'Yenileme hakkınız kalmadı.'
            }
          >
            <Button
              size='icon-sm'
              disabled={user?.apiTenancy === 0 || isValidating}
              onClick={handleFetchTasks}
            >
              <RotateCcw size={14} />
            </Button>
          </CustomTooltip>
        )}
      </CardHeader>
      <CardContent>
        <AnimatePresence>
          {error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className='text-destructive text-sm mb-2'
            >
              {error}
            </motion.p>
          )}
        </AnimatePresence>

        <ScrollArea className='h-[250px] w-full gap-4'>
          {!tasks && !isValidating && (
            <div className='absolute inset-0 flex items-center justify-center flex-col gap-4 -mt-8'>
              <p className='text-muted-foreground'>
                Günlük kalan hak: {user?.apiTenancy.toString() || 0}
              </p>
              <Button
                onClick={handleFetchTasks}
                disabled={isValidating || user?.apiTenancy === 0}
              >
                <Sparkles size={16} className='mr-2' />
                Önerileri Getir
              </Button>
            </div>
          )}

          {isValidating && (
            <div className='flex items-center justify-center h-full'>
              <Spinner size={24} />
            </div>
          )}

          <div className='flex flex-col gap-2'>
            {tasks &&
              tasks.map((task, index) => (
                <motion.div
                  key={index}
                  variants={fadeIn('down', '', index * 0.2, 0.3)}
                >
                  <RecommendedTask task={task} />
                </motion.div>
              ))}
          </div>
        </ScrollArea>

        {/* @ts-ignore */}
        {user?.apiTenancy <= 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className='text-sm text-muted-foreground mt-2'
          >
            Maksimum görev önerisi sayısına ulaştınız.
          </motion.p>
        )}
      </CardContent>
    </Card>
  );
};

export default RecommendedTasks;
