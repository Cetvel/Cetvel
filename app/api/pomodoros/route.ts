import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
   import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import connectDB from '@/lib/config/connectDB';
var { getUser } = getKindeServerSession();
import PomodoroModel from '@/lib/models/pomodoro.model';
import { PomodoroDocument } from '@/lib/models/pomodoro.model';

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
    await connectDB()
    const pomodoros = await PomodoroModel.find({ kindeId: userId });
    return NextResponse.json({ pomodoros, status: 200 });
  } catch (error) {
    console.error(error);
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

    if (!body.tag) {
      return NextResponse.json(
        { message: 'Etiket boş olamaz' },
        { status: 400 }
      )
    }
    

    const pomodoro = new PomodoroModel({
      kindeId: userId,
      ...body,
    }) as PomodoroDocument;
    await connectDB()
    await pomodoro.save();
    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: 'Beklenmedik Sunucu Hatası' },
      { status: 500 }
    );
  }
}
