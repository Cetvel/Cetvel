import { NextRequest, NextResponse } from 'next/server';
import { getAuth } from '@clerk/nextjs/server';
import Pomodoro from '@/lib/models/pomodoro.model';

export async function GET(request: NextRequest) {
  try {

    const { userId } = getAuth(request);

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Türkiye saat dilimi için offset (UTC+3)
    const turkeyOffset = 3 * 60 * 60 * 1000;

    // Şu anki Türkiye zamanı
    const nowInTurkey = new Date(Date.now() + turkeyOffset);

    // Türkiye'de bugünün başlangıcı (00:00)
    const todayStartInTurkey = new Date(nowInTurkey);
    todayStartInTurkey.setUTCHours(0, 0, 0, 0);
    
    // Türkiye'de bugünün sonu (23:59:59.999)
    const todayEndInTurkey = new Date(todayStartInTurkey);
    todayEndInTurkey.setUTCHours(23, 59, 59, 999);

    const result = await Pomodoro.aggregate([
      {
        $match: {
          clerkId: userId,
          startsAt: { 
            $gte: new Date(todayStartInTurkey.getTime() - turkeyOffset),
            $lt: new Date(todayEndInTurkey.getTime() - turkeyOffset)
          }
        }
      },
      {
        $group: {
          _id: null,
          totalDuration: { $sum: '$duration' },
          count: { $sum: 1 }
        }
      }
    ]);

    const todayStats = result[0] || { totalDuration: 0, count: 0 };

    return NextResponse.json({
      todayStatistics: {
        totalDuration: todayStats.totalDuration,
        totalPomodoros: todayStats.count
      }
    });

  } catch (error) {
    console.error('Error fetching today\'s pomodoros:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}