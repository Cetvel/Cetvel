import Pomodoro from '@/lib/models/pomodoro.model';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
const { getUser } = getKindeServerSession();
export async function DELETE(req: NextRequest) {
  try {
    const kindeUser = await getUser();
    const userId = kindeUser?.id;
    if (!userId) {
      return NextResponse.json(
        { message: 'Yetkilendirme Hatası' },
        { status: 401 }
      );
    }

    // developments commit
    const { ids } = await req.json();
    if (ids && Array.isArray(ids)) {
      await Pomodoro.deleteMany({ _id: { $in: ids } });
      return NextResponse.json({ status: 200 });
    } else {
      return NextResponse.json({ error: 'Hatalı istek' }, { status: 400 });
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const kindeUser = await getUser();
    const userId = kindeUser?.id;

    if (!userId) {
      return NextResponse.json(
        { message: 'Yetkilendirme Hatası' },
        { status: 401 }
      );
    }

    const { ids, updateData } = await req.json();

    if (ids && Array.isArray(ids)) {
      await Pomodoro.updateMany({ _id: { $in: ids } }, { $set: updateData });
      return NextResponse.json({ status: 200 });
    } else {
      return NextResponse.json({ error: 'Hatalı istek' }, { status: 400 });
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
