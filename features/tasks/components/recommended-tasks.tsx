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
import { axiosInstance } from '@/lib/utils';

const MAX_REFRESH_COUNT = 5;

const RecommendedTasks: React.FC = () => {
  const [tasks, setTasks] = useState<Task[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isValidating, setIsValidating] = useState(false);
  const [refreshCount, setRefreshCount] = useState(0);

  const fetchRecommendedTasks = useCallback(async () => {
    try {
      setIsValidating(true);
      const data = await axiosInstance
        .get('/gemini/task-suggester')
        .then((res) => res.data);
      console.log(data);

      setTasks(data);
      setError(null);
    } catch (err) {
      setError('Önerilen görevler alınamadı.');
    } finally {
      setIsValidating(false);
    }
  }, []);

  const handleRefresh = useCallback(() => {
    if (refreshCount < MAX_REFRESH_COUNT) {
      setRefreshCount((prevCount) => prevCount + 1);
      fetchRecommendedTasks();
    }
  }, [refreshCount, fetchRecommendedTasks]);

  const isRefreshDisabled = refreshCount >= MAX_REFRESH_COUNT || isValidating;

  return (
    <Card>
      <CardHeader className='flex items-center flex-row justify-between'>
        <h3 className='mt-1 flex'>
          <Sparkles className='w-6 h-6 mr-2 text-primary' />
          Önerilen görevler
        </h3>

        <CustomTooltip
          content={
            MAX_REFRESH_COUNT - refreshCount > 0
              ? `Günlük yenileme hakkınız: ${MAX_REFRESH_COUNT - refreshCount}`
              : 'Yenileme hakkınız kalmadı.'
          }
        >
          <Button
            size='icon-sm'
            onClick={handleRefresh}
            disabled={isRefreshDisabled}
          >
            <RotateCcw size={14} />
          </Button>
        </CustomTooltip>
      </CardHeader>
      <CardContent>
        {error && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='text-red-500'
          >
            {error}
          </motion.p>
        )}

        <AnimatePresence>
          <ScrollArea className='h-[250px] w-full gap-4'>
            {isValidating && !tasks && (
              <Spinner size={24} className='mx-auto' />
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
        </AnimatePresence>

        {refreshCount >= MAX_REFRESH_COUNT && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className='text-sm text-muted-foreground'
          >
            Maksimum görev önerisi sayısına ulaştınız.
          </motion.p>
        )}
      </CardContent>
    </Card>
  );
};

export default RecommendedTasks;
