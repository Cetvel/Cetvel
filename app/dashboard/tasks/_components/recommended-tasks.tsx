import { Card, CardContent, CardHeader } from '@/components/ui/card';
import React from 'react';
import RecommendedTask from './recommended-task';
import { Sparkles } from 'lucide-react';

const RecommendedTasks = () => {
  return (
    <Card className='h-full'>
      <CardHeader>
        <h3 className='header-3 flex'>
          <Sparkles className='w-6 h-6 mr-2 text-primary' />
          Önerilen görevler
        </h3>
      </CardHeader>
      <CardContent className='flex flex-col gap-2'></CardContent>
    </Card>
  );
};

export default RecommendedTasks;
