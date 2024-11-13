import { NextRequest, NextResponse } from 'next/server';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { Users, init } from '@kinde/management-api-js';
import UserMongo from '@/features/users/models/user.model';
import getM2MToken from '@/lib/m2m_token';

init();

export async function PUT(req: NextRequest) {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user) {
      console.warn('PUT request: User not authenticated');
      return NextResponse.json(
        { message: 'Yetkilendirme Hatası' },
        { status: 401 }
      );
    }
    const { username } = await req.json();
    console.log("username", username)
    console.log("user.username", user)

    if (username.includes(' ')) {
      return NextResponse.json(
        { message: 'Lütfen boşluk bırakmayınız' },
        { status: 400 }
      );
    }

    if (!username) {
      return NextResponse.json(
        { message: 'Kullanıcı adı boş olamaz.' },
        { status: 400 }
      );
    }

    const data = (await Users.getUserIdentities({
      userId: user?.id,
    })) as any;
    console.log(data);
    const usernameId = data.identities
      .filter((item: any) => item.type === 'username')
      .find((item: any) => item.name == user.username).id;
    console.log("usernameId", usernameId)

    const accessToken = await getM2MToken();
    await fetch(`https://cetvel.kinde.com/api/v1/identities/${usernameId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    await fetch(`https://cetvel.kinde.com/api/v1/users/${user.id}/identities`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      },
      body: JSON.stringify({
        value: username,
        type: 'username',
      })
    })
    await UserMongo.findOneAndUpdate(
      { kindeId: user.id },
      { name: username } ,
    )


    return NextResponse.json({ status: 200 });
  } catch (error: any) {
    console.error('İşlem hatası:', error);
    if (error.request.errors['429'] == 'Request was throttled.') {
      return NextResponse.json(
        { message: 'Bu kullanıcı ismi önceden alınmış.' },
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
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user) {
      console.warn(
        'Yetkilendirme Hatası DELETE request: User not authenticated'
      );
      return NextResponse.json(
        { message: 'Yetkilendirme Hatası' },
        { status: 401 }
      );
    }

    await Users.deleteUser({
      id: user.id,
      isDeleteProfile: true,
    });
    await UserMongo.deleteOne({ kindeId: user.id });
  } catch (error) {
    console.error('İşlem hatası:', error);
    return NextResponse.json(
      { message: 'Beklenmedik Sunucu Hatası' },
      { status: 500 }
    );
  }
}
