import { getAuth, clerkClient } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';
import { ConvexHttpClient } from 'convex/browser';
import { api } from '@/convex/_generated/api';
import User from '@/lib/models/user.model';
import connectDB from '@/lib/config/connectDB';

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const { userId } = getAuth(req);
    if (!userId)
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { studyField, defaultTemplate, studentClass, notification } =
      await req.json();

    await connectDB();
    const user = await User.findOne({ clerkId: userId });
    if (!user)
      return NextResponse.json(
        { error: 'Kullanıcı bulunamadı.' },
        { status: 404 }
      );

    await clerkClient.users.updateUserMetadata(userId, {
      publicMetadata: {
        isOnboarded: true,
        studyField,
        studentClass,
        notification,
      },
    });

    user.studyField = studyField;
    user.class = studentClass;
    await user.save();

    const convexUser = await convex.query(api.user.crud.getUser, {
      clerkId: userId,
    });
    await convex.mutation(api.user.userPreference.createUserPreference, {
      clerkId: userId,
      userId: convexUser!._id,
      notification,
    });
    await convex.mutation(api.user.crud.updateUserImages, {
      clerkId: userId,
      defaultTemplate,
    });
    if (!convexUser)
      return NextResponse.json(
        { error: 'Kullanıcı bulunamadı.' },
        { status: 404 }
      );

    return NextResponse.json({ status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}
