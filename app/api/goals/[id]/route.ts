import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
   import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import connectDB from '@/lib/config/connectDB';
var { getUser } = getKindeServerSession();
import GoalModel from '@/lib/models/goal.model';

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
    await connectDB()
    const goal = await GoalModel.findOneAndUpdate({ _id: id }, body, {
      new: true,
    });
    if (!goal) {
      return NextResponse.json({ error: 'goal not found' }, { status: 404 });
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
        { error: 'Request body is empty' },
        { status: 400 }
      );
    }
    await connectDB()
    const goal = await GoalModel.findOneAndDelete({ _id: id });
    if (!goal) {
      return NextResponse.json({ error: 'goal not found' }, { status: 404 });
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
