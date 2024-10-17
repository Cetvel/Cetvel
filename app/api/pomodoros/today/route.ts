import { NextRequest, NextResponse } from 'next/server';

import Pomodoro from '@/lib/models/pomodoro.model';
import connectDB from '@/lib/config/connectDB';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
const {getUser }= getKindeServerSession()

export async function GET(request: NextRequest) {
  try {
    const kindeUser = await getUser();
    const userId = kindeUser?.id;

    if (!userId) {
      return NextResponse.json({ message: 'Yetkilendirme Hatası' }, { status: 401 });
    }

    // Türkiye saat dilimi için offset (UTC+3)
    const turkeyOffset = 3 * 60 * 60 * 1000;

    // Şu anki Türkiye zamanı
    const nowInTurkey = new Date(Date.now() + turkeyOffset);

    // Türkiye'de bugünün başlangıcı (00:00)
    const todayStartInTurkey = new Date(nowInTurkey);
    todayStartInTurkey.setUTCHours(0, 0, 0, 0);

    // 7 gün öncesinin başlangıcı (Türkiye zamanı)
    const sevenDaysAgo = new Date(nowInTurkey);
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6);
    sevenDaysAgo.setUTCHours(0, 0, 0, 0);
    await connectDB()
    const result = await Pomodoro.aggregate([
      {
        $match: {
          kindeId: userId,
          startsAt: { $gte: new Date(sevenDaysAgo.getTime() - turkeyOffset) }
        }
      },
      {
        $project: {
          dayOfWeek: {
            $dayOfWeek: {
              $add: ['$startsAt', turkeyOffset]
            }
          },
          isToday: {
            $gte: [
              { $add: ['$startsAt', turkeyOffset] },
              todayStartInTurkey
            ]
          },
          durationInHours: { $divide: ['$duration', 60] },  // Convert minutes to hours
          duration: 1
        }
      },
      {
        $facet: {
          todayStats: [
            {
              $match: { isToday: true }
            },
            {
              $group: {
                _id: null,
                totalDuration: { $sum: '$duration' },
                count: { $sum: 1 }
              }
            }
          ],
          weekStats: [
            {
              $group: {
                _id: null,
                totalDuration: { $sum: '$duration' },
                count: { $sum: 1 }
              }
            }
          ],
          dailyStats: [
            {
              $group: {
                _id: '$dayOfWeek',
                hours: { $sum: '$durationInHours' }
              }
            },
            {
              $project: {
                _id: 0,
                day: {
                  $switch: {
                    branches: [
                      { case: { $eq: ['$_id', 1] }, then: 'Paz' },
                      { case: { $eq: ['$_id', 2] }, then: 'Pzt' },
                      { case: { $eq: ['$_id', 3] }, then: 'Sal' },
                      { case: { $eq: ['$_id', 4] }, then: 'Çar' },
                      { case: { $eq: ['$_id', 5] }, then: 'Per' },
                      { case: { $eq: ['$_id', 6] }, then: 'Cum' },
                      { case: { $eq: ['$_id', 7] }, then: 'Cmt' }
                    ],
                    default: 'Bilinmeyen'
                  }
                },
                hours: { $round: ['$hours', 1] }
              }
            }
          ]
        }
      }
    ]);

    const [{ todayStats, weekStats, dailyStats }] = result;

    const todayStatistics = todayStats[0] || { totalDuration: 0, count: 0 };
    const weekStatistics = weekStats[0] || { totalDuration: 0, count: 0 };

    // Haftalık istatistikleri doldur ve sırala
    const daysOfWeek = ['Paz', 'Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt'];
    const filledDailyStats = daysOfWeek.map(day => {
      const found = dailyStats.find((item: { day: string; }) => item.day === day);
      return found || { day, hours: 0 };
    });

    // Sonuçları son 7 güne göre düzenle
    const today = nowInTurkey.getDay();
    const chartData = [
      ...filledDailyStats.slice(today + 1),
      ...filledDailyStats.slice(0, today + 1)
    ];

    return NextResponse.json({
      todayStatistics: {
        totalDuration: todayStatistics.totalDuration,
        totalPomodoros: todayStatistics.count
      },
      lastWeekStatistics: {
        totalDuration: weekStatistics.totalDuration,
        totalPomodoros: weekStatistics.count,
        averageDuration: weekStatistics.count > 0
          ? Math.round(weekStatistics.totalDuration / weekStatistics.count)
          : 0
      },
      chartData: chartData
    }, { status: 200 });

  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}