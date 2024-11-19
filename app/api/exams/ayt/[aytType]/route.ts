import { NextRequest, NextResponse } from 'next/server';
   import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import connectDB from '@/lib/config/connectDB';
var { getUser } = getKindeServerSession();
import AytModel from '@/lib/models/ayt.model';
import { AytDocument } from '@/lib/models/ayt.model';

export async function GET(
  request: NextRequest,
  { params }: { params: { aytType: string } }
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

    const { aytType } = params;

    if (aytType !== 'say' && aytType !== 'ea' && aytType !== 'soz')
      return NextResponse.json(
        { error: 'Geçerli bir Ayt formatı giriniz.' },
        { status: 400 }
      );
    let field;
    switch (aytType) {
      case 'say':
        field = 'SAY';
        break;
      case 'ea':
        field = 'EA';
        break;
      case 'soz':
        field = 'SOZ';
        break;
    }
    await connectDB()
    const exams = (await AytModel.find({
      kindeId: userId,
      aytType: field,
    })) as AytDocument[];

    return NextResponse.json(exams, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: 'Beklenmedik Sunucu Hatası' },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { aytType: string } }
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

    const { aytType } = params;
    if (aytType !== 'say' && aytType !== 'ea' && aytType !== 'soz')
      return NextResponse.json(
        { error: 'Geçerli bir Ayt formatı giriniz.' },
        { status: 400 }
      );
    const body = await request.json();

    let field;
    switch (aytType) {
      case 'say':
        field = 'SAY';
        break;
      case 'ea':
        field = 'EA';
        break;
      case 'soz':
        field = 'SOZ';
        break;
    }

    const exam = new AytModel({
      kindeId: userId,
      field,
      ...body,
    }) as AytDocument;
    await connectDB()
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
