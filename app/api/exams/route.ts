import { NextRequest, NextResponse } from 'next/server';
   import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import connectDB from '@/lib/config/connectDB';
var { getUser } = getKindeServerSession();
import ExamModel from '@/lib/models/exam.model';

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
    const exams = await ExamModel.find({ kindeId: userId });
    return NextResponse.json(exams, { status: 200 });
  } catch (error) {
    console.error(error);
    console.error(error);
    return NextResponse.json(
      { message: 'Beklenmedik Sunucu Hatası' },
      { status: 500 }
    );
  }
}
