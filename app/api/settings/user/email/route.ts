import { NextRequest, NextResponse } from 'next/server';
   import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import connectDB from '@/lib/config/connectDB';
import getM2MToken from '@/lib/m2m_token';
import { Users, init } from '@kinde/management-api-js';
import User from '@/lib/models/user.model';

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
    console.log('user', user);
    const { email } = await req.json();

    const data = (await Users.getUserIdentities({
      userId: user?.id,
    })) as any;
    console.log(data);
    const response = await Users.createUserIdentity({
      userId: user.id,
      requestBody: {
        value: email,
        type: 'email',
      },
    });
    const identityId = response.identity?.id;
    const accessToken = await getM2MToken();
    await fetch(`https://cetvel.kinde.com/api/v1/identities/${identityId}`, {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });
    await connectDB()
    await User.findOneAndUpdate({ kindeId: user.id }, { email: email });
    return NextResponse.json({ status: 200 });
  } catch (error: any) {
    console.error('İşlem hatası:', error);
    if (
      error?.request?.errors &&
      error.request.errors['429'] === 'Request was throttled.'
    ) {
      return NextResponse.json(
        { message: 'Bu e-posta adresi önceden eklenmiş.' },
        { status: 429 }
      );
    }
    return NextResponse.json(
      { message: 'Beklenmedik Sunucu Hatası' },
      { status: 500 }
    );
  }
}
