import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
var { getUser } = getKindeServerSession();
import TodoModel from '@/features/tasks/models/todo.model';
   

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
       ;
    const todo = await TodoModel.findOneAndUpdate({ _id: id }, body, {
      new: true,
    });
    if (!todo) {
      return NextResponse.json({ error: 'Todo not found' }, { status: 404 });
    }
    return NextResponse.json({ status: 200 });
  } catch (error) {
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
  } catch (error) {}
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
  const todo = await TodoModel.findOneAndDelete({ _id: id });
  if (!todo) {
    return NextResponse.json({ error: 'Todo not found' }, { status: 404 });
  }
  return NextResponse.json({ status: 200 });
}
