import { NextResponse } from 'next/server';
import { getAuth } from '@clerk/nextjs/server';
import { NextRequest } from 'next/server';
import User from '@/lib/models/user.model';
import connectDB from '@/lib/config/connectDB';

export async function GET(req: NextRequest) {
  try {
    const { userId } = getAuth(req);
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized: User not authenticated' }, { status: 401 });
    }

    // Veritabanı bağlantısı kontrolü
    try {
      await connectDB();
    } catch (dbError) {
      console.error('Database connection error:', dbError);
      return NextResponse.json({ error: 'Database connection failed' }, { status: 500 });
    }

    const user = await User.findOne({ clerkId: userId });
    if (!user) {
      console.warn(`User not found for userId: ${userId}`);
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ user });
  } catch (error: any) {
    console.error('GET Request Error:', error.message || error);
    return NextResponse.json({ error: 'Internal Server Error: An unexpected error occurred' }, { status: 500 });
  }
}

// PUT request handler
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId } = getAuth(request);

    if (!userId) {
      console.warn('Unauthorized PUT request: User not authenticated');
      return NextResponse.json({ error: 'Unauthorized: User not authenticated' }, { status: 401 });
    }

    if (!body || Object.keys(body).length === 0) {
      console.warn('PUT request with empty body');
      return NextResponse.json({ error: 'Bad Request: Request body is empty' }, { status: 400 });
    }

    // Veritabanı bağlantısı kontrolü
    try {
      await connectDB();
    } catch (dbError) {
      console.error('Database connection error:', dbError);
      return NextResponse.json({ error: 'Database connection failed' }, { status: 500 });
    }

    const updatedUser = await User.findOneAndUpdate({ clerkId: userId }, body, { new: true });
    if (!updatedUser) {
      console.warn(`User update failed for userId: ${userId}`);
      return NextResponse.json({ error: 'User not found or update failed' }, { status: 404 });
    }

    return NextResponse.json({ message: 'User updated successfully', status: 200 });
  } catch (error: any) {
    console.error('PUT Request Error:', error.message || error);
    return NextResponse.json({ error: 'Internal Server Error: An unexpected error occurred' }, { status: 500 });
  }
}
