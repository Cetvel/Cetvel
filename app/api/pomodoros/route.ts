import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
var { getUser } = getKindeServerSession();
import PomodoroModel from '@/features/focus-sessions/models/pomodoro.model';
import { PomodoroDocument } from '@/features/focus-sessions/models/pomodoro.model';
import connectDB from '@/lib/config/connectDB';

export async function GET(request: NextRequest) {
  try {
    const kindeUser = await getUser();
    const userId = kindeUser?.id;
    if (!userId) {
      return NextResponse.json(
        { message: 'Yetkilendirme Hatası' },
        { status: 401 }
      );
    }

    await connectDB();
    const pomodoros = await PomodoroModel.find({ kindeId: userId });
    return NextResponse.json({ pomodoros, status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: 'Beklenmedik Sunucu Hatası' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const kindeUser = await getUser();
    const userId = kindeUser?.id;
    if (!userId) {
      return NextResponse.json(
        { message: 'Yetkilendirme Hatası' },
        { status: 401 }
      );
    }

    const body = await request.json();

    await connectDB();
    const pomodoro = new PomodoroModel({
      kindeId: userId,
      ...body,
    }) as PomodoroDocument;

    await pomodoro.save();
    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: 'Beklenmedik Sunucu Hatası' },
      { status: 500 }
    );
  }
}
