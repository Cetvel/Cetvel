"use server"

import { Server as SocketIOServer } from 'socket.io';
import { NextApiRequest } from 'next';


export async function register() {

  // if (process.env.NEXT_RUNTIME === 'nodejs') {
  //   const httpServer = (await import('http')).createServer();
  //   const io = new SocketIOServer(httpServer, {
  //     path: '/api/socketio',
  //   });

  //   io.on('connection', (socket) => {
  //     console.log('A client connected');

  //     socket.on('join', (userId) => {
  //       socket.join(userId);
  //       console.log(`User ${userId} joined`);
  //     });

  //     socket.on('disconnect', () => {
  //       console.log('A client disconnected');
  //     });
  //   });

  //   // WebSocket sunucusunu başlat
  //   const PORT = parseInt(process.env.WEBSOCKET_PORT || '3001', 10);
  //   httpServer.listen(PORT, () => {
  //     console.log(`WebSocket server is running on port ${PORT}`);
  //   });

  //   // Global nesneye WebSocket sunucusunu ekle
  //   (global as any).__io = io;
  // }

  if (process.env.NEXT_RUNTIME === 'nodejs') {
    const connectDB = (await import('./lib/config/config')).default;
    await connectDB();
  }

  // Register the cron jobs
  const { setupCronJobs } = await import('./lib/node-cron');
  setupCronJobs();
}