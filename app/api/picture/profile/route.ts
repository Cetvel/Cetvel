import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import connectDB from '@/lib/config/connectDB';
import UserMongo from '@/lib/models/user.model';
import { NextResponse, NextRequest } from 'next/server';


export async function PUT(req: NextRequest) {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    const { url } = await req.json();

    if (!user) {
      console.warn('PUT request: User not authenticated');
      return NextResponse.json(
        { message: 'Yetkilendirme Hatası' },
        { status: 401 }
      );
    }
    await connectDB()
    await UserMongo.findOneAndUpdate(
      { kindeId: user.id },
      {
        profile_picture: url,
      }
    );

    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.error('İşlem hatası:', error);
    return NextResponse.json(
      { message: 'Beklenmedik Sunucu Hatası' },
      { status: 500 }
    );
  }
}
