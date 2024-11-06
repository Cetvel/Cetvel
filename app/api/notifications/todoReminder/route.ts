import connectDB from '@/lib/config/connectDB';
import Todo from '@/features/tasks/models/todo.model';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const kindeId = searchParams.get('kindeId');
  if (!kindeId) {
    return NextResponse.json(
      { message: 'Yetkilendirme Hatası' },
      { status: 401 }
    );
  }
  /// akiyor burasi akiyoe aga
  // Türkiye saatine göre (UTC+3) şu anki zamanı al
  const now = new Date();
  const turkeyOffset = 3 * 60 * 60 * 1000; // 3 saat
  const turkeyTime = new Date(now.getTime() + turkeyOffset);

  // Türkiye saatine göre günün başlangıcı ve sonu
  const startOfDay = new Date(turkeyTime);
  startOfDay.setHours(0, 0, 0, 0);
  const endOfDay = new Date(turkeyTime);
  endOfDay.setHours(23, 59, 59, 999);

  try {
    await connectDB();
    const count = await Todo.countDocuments({
      kindeId,
      status: 'incomplete',
      startsAt: { $lte: endOfDay },
      endsAt: { $gte: startOfDay },
    });

    return NextResponse.json({ count }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: 'Beklenmedik Sunucu Hatası' },
      { status: 500 }
    );
  }
}
