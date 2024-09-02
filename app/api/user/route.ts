import { NextResponse } from 'next/server';
import { getAuth } from '@clerk/nextjs/server';
import { NextRequest } from 'next/server';
import User from '@/lib/models/user.model';

export async function GET(req: NextRequest) {
  try {

    const { userId } = getAuth(req);
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const user = await User.findOne({ clerkId: userId });
    if (!user) return NextResponse.json({ error: "Kullanıcı bulunamadı" }, { status: 404 })
    return NextResponse.json({ user })
  } catch (error: any) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}


// PUT request handler
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId } = getAuth(request);
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const updatedUser = await User.findOneAndUpdate({ clerkId: userId }, body, { new: true });
    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }

}

