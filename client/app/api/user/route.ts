import { NextResponse } from 'next/server';
import { getAuth } from '@clerk/nextjs/server';
import { getUserByClerkId } from "@/lib/services/user.service";
import { NextRequest } from 'next/server';
import User from '@/lib/models/user.model';

export async function GET(req: NextRequest) {
    const { userId } = getAuth(req);
    const user = await getUserByClerkId(userId!)
    return NextResponse.json({user});
}


// PUT request handler
export async function PUT(request: NextRequest) {
  const body = await request.json();
  const { userId } = getAuth(request);
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const updatedUser = await User.findOneAndUpdate({ clerkId: userId }, body, { new: true });
  return NextResponse.json(updatedUser, { status: 200 } );
}

