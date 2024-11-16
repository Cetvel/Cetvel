import FocusForge from '@/features/focus-sessions/forms/focus-timer-form';
import PageHeader from '@/components/global/page-header';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import React from 'react';
import Statistics from '@/features/focus-sessions/components/stats';
import FocusingHistory from '@/features/focus-sessions/components/focusing-history';
import { Disc, Timer, TrendingUp } from 'lucide-react';
import Goals from '@/features/goals/components/goals';

const Focusing = () => {
  return (
    <>
      {/* <PageHeader title='Odaklanma' /> */}
      <div className='grid grid-cols-1 xl:grid-cols-3 gap-6'>
        <Card>
          <CardHeader>
            <h2 className='text-lg font-semibold flex items-center gap-3'>
              <div className='border rounded-md p-1.5'>
                <Timer size={18} className='text-muted-foreground' />
              </div>
              Odaklanma Zamanlayıcısı
            </h2>
          </CardHeader>
          <CardContent>
            <FocusForge />
          </CardContent>
        </Card>
        <Card className='flex flex-col justify-between'>
          <CardHeader>
            <h3 className='flex items-center gap-3'>
              <div className='border rounded-md p-1.5'>
                <TrendingUp size={18} className='text-muted-foreground' />
              </div>
              Odaklanma İstatistikleri
            </h3>
          </CardHeader>
          <Statistics />
        </Card>
        <Card className='flex flex-col justify-between'>
          <CardHeader>
            <h3 className='flex items-center gap-3'>
              <div className='border rounded-md p-1.5'>
                <Disc size={18} className='text-muted-foreground' />
              </div>
              Hedefler
            </h3>
          </CardHeader>
          <Goals />
        </Card>
      </div>
      <FocusingHistory />
    </>
  );
};

export default Focusing;
