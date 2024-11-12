   
import { NextResponse } from 'next/server';
import Contact from '@/lib/models/contact.model';

/// some change
export async function POST(res: NextResponse) {
  try {
       ;
    const { name, email, message } = await res.json();
    Contact.create({ name, email, message });
    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      status: 500,
      message: 'Beklenmedik Sunucu Hatası',
    });
  }
}
