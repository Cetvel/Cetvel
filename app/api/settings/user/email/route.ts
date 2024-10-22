import { NextRequest, NextResponse } from 'next/server';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import getM2MToken from '@/lib/m2m_token';
import { Users, init } from '@kinde/management-api-js';
import UserMongo from '@/lib/models/user.model';

init();

export async function PUT(req: NextRequest) {
  try {
    const user = await getKindeServerSession().getUser();
    if (!user) {
      console.warn('Yetkilendirme Hatası PUT request: User not authenticated');
      return NextResponse.json(
        { message: 'Yetkilendirme Hatası' },
        { status: 401 }
      );
    }
    const { email } = await req.json();

    await Users.createUserIdentity({
      userId: user?.id,
      requestBody: {
        value: email,
        type: 'email',
      },
    });

    return NextResponse.json({ status: 200 });
  } catch (error: any) {
    console.error('İşlem hatası:', error);
    console.log('error request', error.request);
    if (error.request.errors['429'] == 'Request was throttled.') {
      return NextResponse.json(
        { message: 'Bu e-posta adresi zaten kullanılıyor.' },
        { status: 429 }
      );
    }
    return NextResponse.json(
      { message: 'Beklenmedik Sunucu Hatası' },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const user = await getKindeServerSession().getUser();
    if (!user) {
      console.warn('Yetkilendirme Hatası PUT request: User not authenticated');
      return NextResponse.json(
        { message: 'Yetkilendirme Hatası' },
        { status: 401 }
      );
    }
    const { email } = await req.json();

    const data = (await Users.getUserIdentities({
      userId: user?.id,
    })) as any;
    console.log('data', data);
    const emails = data.identities.filter((item: any) => item.type === 'email');

    if (emails.length == 1) {
      return NextResponse.json(
        { message: 'En az bir e-posta adresi girilmelidir.' },
        { status: 400 }
      );
    }
    const emailId = emails.find((item: any) => item.name == email).id;
    const accessToken = await getM2MToken();

    await fetch(`https://cetvel.kinde.com/api/v1/identities/${emailId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.error('İşlem hatası:', error);
    return NextResponse.json(
      { message: 'Beklenmedik Sunucu Hatası' },
      { status: 500 }
    );
  }
}

function getIdentityId(data: any, email: string): string | undefined {
  return data.identities.find((item: any) => item.name === email)?.id;
}
