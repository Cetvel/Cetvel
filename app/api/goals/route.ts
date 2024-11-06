import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
var { getUser } = getKindeServerSession();
import GoalModel from '@/features/goals/models/goal.model';
import { IGoalDocument } from '@/features/goals/models/goal.model';
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
    const goals = await GoalModel.find({ kindeId: userId });
    if (goals == undefined) {
      console.log('goals could not find');
      return NextResponse.json(
        { message: 'Beklenmedik Sunucu Hatası' },
        { status: 404 }
      );
    }
    return NextResponse.json(goals, { status: 200 });
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

    const goal = new GoalModel({
      kindeId: userId,
      ...body,
    }) as IGoalDocument;
    await goal.save();
    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: 'Beklenmedik Sunucu Hatası' },
      { status: 500 }
    );
  }
}
