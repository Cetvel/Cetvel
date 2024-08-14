'use server'

import cron from 'node-cron';
import NotificationService from '@/lib/notificationSystem';

export async function setupCronJobs() {
  // Her gün saat 09:00'da çalışacak bir cron job
  

  // Her saat başı çalışacak bir cron job
  // cron.schedule('*/30 * * * * *', () => {
  //   console.log('Task is running every 30 seconds');
  // })

  console.log('Cron jobs set up successfully');
}

