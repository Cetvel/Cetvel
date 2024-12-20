import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
   import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import connectDB from '@/lib/config/connectDB';
import ExamModel from '@/lib/models/exam.model';

const { getUser } = getKindeServerSession();

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
        { error: 'Request paramater is empty' },
        { status: 400 }
      );
    }

    const body = await request.json();
    await connectDB()
    const exam = await ExamModel.findOneAndUpdate({ _id: id }, body, {
      new: true,
    });
    if (!exam) {
      return NextResponse.json(
        { error: 'Denemeniz güncellenemedi.' },
        { status: 404 }
      );
    }

    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.error(error);
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
        { error: 'Silmek istediğiniz deneme bulunamadı.' },
        { status: 400 }
      );
    }
    await connectDB()
    const exam = await ExamModel.findOneAndDelete({ _id: id });

    if (!exam) {
      return NextResponse.json(
        { error: 'Silmek istediğiniz deneme bulunamadı.' },
        { status: 404 }
      );
    }

    return NextResponse.json({ status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: 'Beklenmedik Sunucu Hatası' },
      { status: 400 }
    );
  }
}
