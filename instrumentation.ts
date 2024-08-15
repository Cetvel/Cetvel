"use server"

import type { NextApiRequest } from 'next';
import type { Server as SocketIOServer } from 'socket.io';

let isDbConnected = false;
let isCronSetup = false;

export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    // Database connection
    if (!isDbConnected) {
      try {
        const connectDB = (await import('./lib/config/config')).default;
        await connectDB();
        isDbConnected = true;
      } catch (error) {
        console.error('Failed to connect to database:', error);
      }
    }

    // Cron jobs setup
    if (!isCronSetup) {
      try {
        const { setupCronJobs } = await import('./lib/node-cron');
        await setupCronJobs();
        isCronSetup = true;
      } catch (error) {
        console.error('Failed to setup cron jobs:', error);
      }
    }
  }
}