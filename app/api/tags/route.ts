import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
   import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import connectDB from '@/lib/config/connectDB';
var { getUser } = getKindeServerSession();
import TagModel from '@/lib/models/tag.model';
import { ITagDocument } from '@/lib/models/tag.model';

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
    const tags = await TagModel.find({ kindeId: userId });
    return NextResponse.json(tags, { status: 200 });
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
    const body = await request.json();
    if (!userId) {
      return NextResponse.json(
        { message: 'Yetkilendirme Hatası' },
        { status: 401 }
      );
    }
    await connectDB()
    const isTagExist = await TagModel.countDocuments({
      value: body.value,
      kindeId: userId,
    });
    if (isTagExist) {
      return NextResponse.json(
        { error: 'Bu etiketi zaten oluşturdunuz.' },
        { status: 400 }
      );
    }
    
    const tag = new TagModel({
      kindeId: userId,
      ...body,
    }) as ITagDocument;

    await tag.save();
    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: 'Beklenmedik Sunucu Hatası' },
      { status: 500 }
    );
  }
}
