import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';

const SubscriptionPage = () => {
  return (
    <Card className='w-full'>
      <CardHeader>
        <CardTitle>Abonelik</CardTitle>
        <CardDescription>Abonelik durumunuz ve mevcut planlar</CardDescription>
      </CardHeader>
      <CardContent className='space-y-6'>
        <div className='space-y-4'>
          <h3 className='text-lg font-semibold'>Mevcut Abonelik</h3>
          <div className='form-line'>
            <Label>Plan</Label>
            <div className='flex items-center space-x-2'>
              <span>Premium Plan</span>
              <Badge>Aktif</Badge>
            </div>
          </div>
          <div className='form-line'>
            <Label>Süre</Label>
            <span>Yıllık abonelik</span>
          </div>
          <div className='form-line'>
            <Label>Yenileme Tarihi</Label>
            <span>1 Ocak 2025</span>
          </div>
        </div>

        <div className='space-y-4'>
          <h3 className='text-lg font-semibold'>Abonelik Planları</h3>
          <div className='form-line'>
            <Label>Temel Plan</Label>
            <div className='flex items-center space-x-2'>
              <span>Aylık 29.99 TL</span>
              <Button size='sm'>Seç</Button>
            </div>
          </div>
          <div className='form-line'>
            <Label>Premium Plan</Label>
            <div className='flex items-center space-x-2'>
              <span>Yıllık 299.99 TL</span>
              <Button size='sm' variant='secondary'>
                Mevcut Plan
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant='outline'>Aboneliği İptal Et</Button>
      </CardFooter>
    </Card>
  );
};

export default SubscriptionPage;
