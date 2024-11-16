import { NextRequest, NextResponse } from 'next/server';
import Contact from '@/lib/models/contact.model';
import connectDB from '@/lib/config/connectDB';

/// some change
export async function POST(res : NextRequest) {
  try {
    await connectDB();
    const { name, email, message } = await res.json();
    Contact.create({ name, email, message });
    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      status: 500,
      message: 'Beklenmedik Sunucu Hatası',
    });
  }
}
