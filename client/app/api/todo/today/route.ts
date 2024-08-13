import { NextRequest, NextResponse } from 'next/server';
import { getAuth } from '@clerk/nextjs/server';
import Todo from '@/lib/models/todo.model';
export async function GET(request:NextRequest) {
  try {
    const { userId } = getAuth(request);

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }


    // Türkiye saat dilimi için offset (UTC+3)
    const turkeyOffset = 3 * 60 * 60 * 1000; // 3 saat milisaniye cinsinden

    // Şu anki Türkiye zamanı
    const nowInTurkey = new Date(Date.now() + turkeyOffset);

    // Türkiye'de bugünün başlangıcı (00:00)
    const todayStartInTurkey = new Date(nowInTurkey);
    todayStartInTurkey.setUTCHours(0, 0, 0, 0);
    
    // Türkiye'de bugünün sonu (23:59:59.999)
    const todayEndInTurkey = new Date(todayStartInTurkey);
    todayEndInTurkey.setUTCHours(23, 59, 59, 999);

    // MongoDB sorgusu
    const todos = await Todo.find({
      clerkId: userId,
      $expr: {
        $and: [
          // startsAt Türkiye günü içinde
          { $gte: [{ $add: ['$startsAt', turkeyOffset] }, todayStartInTurkey] },
          { $lt: [{ $add: ['$startsAt', turkeyOffset] }, todayEndInTurkey] },
          // endsAt Türkiye günü içinde
          { $gte: [{ $add: ['$endsAt', turkeyOffset] }, todayStartInTurkey] },
          { $lt: [{ $add: ['$endsAt', turkeyOffset] }, todayEndInTurkey] }
        ]
      }
    }).sort({ startsAt: -1 });
    // const pomodoros = await Pomodoro.find({})

    const completedTodosCount = todos.filter(todo => todo.status === 'completed').length;

    return NextResponse.json({todos,completedTodosCount});
  } catch (error) {
    console.error('Error fetching pomodoros:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}