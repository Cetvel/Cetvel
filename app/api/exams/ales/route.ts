// app/api/exam/dgs/route.ts

import { NextRequest, NextResponse } from 'next/server';
import AlesModel from '@/features/exams/models/ales.model';

import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
const { getUser } = getKindeServerSession();

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
    const exams = await AlesModel.find({ kindeId: userId });

    return NextResponse.json(exams, { status: 200 });
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
    const exam = new AlesModel({
      kindeId: userId,
      ...body,
    });
    await exam.save();

    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: 'Beklenmedik Sunucu Hatası' },
      { status: 500 }
    );
  }
}
