import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import User from '@/features/users/models/user.model';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import connectDB from '@/lib/config/connectDB';
const { getUser } = getKindeServerSession();
export async function GET(req: NextRequest) {
  try {
    const kindeUser = await getUser();
    const userId = kindeUser?.id;

    if (!userId) {
      return NextResponse.json(
        { error: 'Yetkilendirme Hatası: User not authenticated' },
        { status: 401 }
      );
    }

    // Veritabanı bağlantısı kontrolü
    try {
      await connectDB();
    } catch (dbError) {
      console.error('Database connection error:', dbError);
      return NextResponse.json(
        { error: 'Database connection failed' },
        { status: 500 }
      );
    }

    const user = await User.findOne({ kindeId: userId });
    if (!user) {
      console.warn(`User not found for userId: ${userId}`);
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(user, { status: 200 });
  } catch (error: any) {
    console.error('GET Request Error:', error.message || error);
    return NextResponse.json(
      { error: 'Beklenmedik Sunucu Hatası' },
      { status: 500 }
    );
  }
}

// PUT request handler
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const kindeUser = await getUser();
    const userId = kindeUser?.id;

    if (!userId) {
      console.warn('Yetkilendirme Hatası PUT request: User not authenticated');
      return NextResponse.json(
        { error: 'Yetkilendirme Hatası: User not authenticated' },
        { status: 401 }
      );
    }

    if (!body || Object.keys(body).length === 0) {
      console.warn('PUT request with empty body');
      return NextResponse.json(
        { error: 'Bad Request: Request body is empty' },
        { status: 400 }
      );
    }

    // Veritabanı bağlantısı kontrolü
    try {
      await connectDB();
    } catch (dbError) {
      console.error('Database connection error:', dbError);
      return NextResponse.json(
        { error: 'Database connection failed' },
        { status: 500 }
      );
    }

    const updatedUser = await User.findOneAndUpdate({ kindeId: userId }, body, {
      new: true,
    });
    if (!updatedUser) {
      console.warn(`User update failed for userId: ${userId}`);
      return NextResponse.json(
        { error: 'User not found or update failed' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: 'User updated successfully',
      status: 200,
    });
  } catch (error: any) {
    console.error('PUT Request Error:', error.message || error);
    return NextResponse.json(
      { error: 'Beklenmedik Sunucu Hatası' },
      { status: 500 }
    );
  }
}
