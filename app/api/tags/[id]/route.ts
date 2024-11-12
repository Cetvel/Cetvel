import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
var { getUser } = getKindeServerSession();
import TagModel from '@/features/tags/models/tag.model';
   
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

       ;
    const body = await request.json();
    const tag = await TagModel.findOneAndUpdate({ _id: id }, body, {
      new: true,
    });
    if (!tag) {
      return NextResponse.json(
        { error: 'Etiket güncellenemedi' },
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
       ;
    const tag = await TagModel.findOneAndDelete({ _id: id });
    if (!tag) {
      return NextResponse.json(
        { error: 'Lütfen silme butonuna üst üste tıklamayınız.' },
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
