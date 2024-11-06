import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
var { getUser } = getKindeServerSession();
import PomodoroModel from '@/features/focus-sessions/models/pomodoro.model';
import connectDB from '@/lib/config/connectDB';
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const kindeUser = await getUser();
    const userId = kindeUser?.id;
    if (!userId) {
      return NextResponse.json(
        { message: 'Yetkilendirme Hatası' },
        { status: 401 }
      );
    }

    const { id } = params;
    if (!id) {
      return NextResponse.json(
        { error: 'Request body is empty' },
        { status: 400 }
      );
    }

    const body = await request.json();
    await connectDB();
    const pomodoro = await PomodoroModel.findOneAndUpdate({ _id: id }, body, {
      new: true,
    });
    if (!pomodoro) {
      return NextResponse.json(
        { error: 'pomodoro not found' },
        { status: 404 }
      );
    }
    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: 'Beklenmedik Sunucu Hatası' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const kindeUser = await getUser();
    const userId = kindeUser?.id;
    if (!userId) {
      return NextResponse.json(
        { message: 'Yetkilendirme Hatası' },
        { status: 401 }
      );
    }

    const { id } = params;
    if (!id) {
      return NextResponse.json(
        { error: 'Request body is empty' },
        { status: 400 }
      );
    }
    await connectDB();
    const pomodoro = await PomodoroModel.findOneAndDelete({ _id: id });
    if (!pomodoro) {
      return NextResponse.json(
        { error: 'pomodoro not found' },
        { status: 404 }
      );
    }
    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: 'Beklenmedik Sunucu Hatası' },
      { status: 500 }
    );
  }
}
