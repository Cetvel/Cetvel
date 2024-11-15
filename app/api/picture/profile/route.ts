import getM2MToken from '@/lib/m2m_token';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { Users, init } from '@kinde/management-api-js';
import UserMongo from '@/lib/models/user.model';
import { NextResponse, NextRequest } from 'next/server';

init();

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
    const accessToken = await getM2MToken();
    const response = await fetch(
      `https://cetvel.kinde.com/api/v1/user?id=${user.id}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          picture: url,
        }),
      }
    );
    if (!response.ok) {
      const errorData = await response.json();
      console.error('Kinde API Hatası:', errorData);
      return NextResponse.json(
        { message: 'Kinde API Hatası', error: errorData },
        { status: response.status }
      );
    }

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
