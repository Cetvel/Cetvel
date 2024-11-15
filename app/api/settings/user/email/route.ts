import { NextRequest, NextResponse } from 'next/server';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
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
    const { email } = await req.json();
    await Users.createUserIdentity({
      userId: user?.id,
      requestBody: {
        value: email,
        type: 'email',
      },
    });

    const data = (await Users.getUserIdentities({
      userId: user?.id,
    })) as any;
    console.log(data);
    const emailId = data.identities
      .filter((item: any) => item.type === 'email')
      .find((item: any) => item.name == email).id;
    const accessToken = await getM2MToken();
    await fetch(`https://cetvel.kinde.com/api/v1/identities/${emailId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });
    await User.findOneAndUpdate({ kindeId: user.id }, { email: email });
    return NextResponse.json({ status: 200 });
  } catch (error: any) {
    console.error('İşlem hatası:', error);
    if (error.request.errors['429'] == 'Request was throttled.') {
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
