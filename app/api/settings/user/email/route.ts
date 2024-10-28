import { NextRequest, NextResponse } from 'next/server';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import getM2MToken from '@/lib/m2m_token';
import { Users, init } from "@kinde/management-api-js";
import Email from '@/lib/models/email.model';
import connectDB from '@/lib/config/connectDB';

init();

export async function POST(req: NextRequest) {
  try {
    const user = await getKindeServerSession().getUser();
    if (!user) {
      console.warn('Yetkilendirme Hatası PUT request: User not authenticated');
      return NextResponse.json({ message: 'Yetkilendirme Hatası' }, { status: 401 });
    }
    const { email } = await req.json();

    await Users.createUserIdentity({
      userId: user?.id,
      requestBody: {
        value: email,
        type: "email"
      }
    })
    await connectDB()
    await Email.create({
      kindeId: user.id,
      value: email,
      isPrimary: false
    }).then(() => console.log('Email created'));
    return NextResponse.json({ status: 200 });

  } catch (error: any) {
    console.error('İşlem hatası:', error);
    if (error.request.errors["429"] == 'Request was throttled.') {
      return NextResponse.json({ message: "Bu mail önceden eklenmiş." }, { status: 429 });
    }
    return NextResponse.json({ message: "Beklenmedik Sunucu Hatası" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const user = await getKindeServerSession().getUser();
    if (!user) {
      console.warn('Yetkilendirme Hatası PUT request: User not authenticated');
      return NextResponse.json({ message: 'Yetkilendirme Hatası' }, { status: 401 });
    }
    const { email } = await req.json();

    const data = await Users.getUserIdentities({
      userId: user?.id
    }) as any
    console.log(data)
    const emails = data.identities.filter((item: any) => item.type === "email")
    console.log(emails)
    if (emails.length == 1) {
      return NextResponse.json({ message: "En az bir mail adresi olmalıdır." }, { status: 400 });
    }
    const emailId = emails.find((item: any) => item.name == email).id
    const accessToken = await getM2MToken();

    await fetch(`https://cetvel.kinde.com/api/v1/identities/${emailId}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        }
      })
    await connectDB()

    await Email.deleteOne({
      kindeId: user.id,
      value: email
    }).then(() => console.log('Email deleted'));

    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.error('İşlem hatası:', error);
    return NextResponse.json({ message: "Beklenmedik Sunucu Hatası" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const user = await getKindeServerSession().getUser();
    if (!user) {
      console.warn('Yetkilendirme Hatası PUT request: User not authenticated');
      return NextResponse.json({ message: 'Yetkilendirme Hatası' }, { status: 401 });
    }
    const { email } = await req.json();

    const data = await Users.getUserIdentities({
      userId: user?.id
    }) as any
    const emails = data.identities
      .filter((item: any) => item.type === "email")

    const emailId = emails.find((item: any) => item.name == email).id
    const accessToken = await getM2MToken();


    await fetch(`https://cetvel.kinde.com/api/v1/identities/${emailId}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify({
          is_primary: true
        })
      })


    await connectDB()
    await Email.updateMany(
      { kindeId: user.id },
      { primary: false }
    );
    await Email.findOneAndUpdate({
      kindeId: user.id,
      value: email
    }, {
      isPrimary: true
    }).then(() => console.log('Email updated'));

    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.error('İşlem hatası:', error);
    return NextResponse.json({ message: "Beklenmedik Sunucu Hatası" }, { status: 500 });
  }
}


export async function GET() {
  try {
    const user = await getKindeServerSession().getUser();
    if (!user) {
      console.warn('Yetkilendirme Hatası GET request: User not authenticated');
      return NextResponse.json({ message: 'Yetkilendirme Hatası' }, { status: 401 });
    }
    await connectDB()
    const emails = await Email.find({ kindeId: user.id })
    return NextResponse.json(emails, { status: 200 });
  } catch (error) {
    console.error('İşlem hatası:', error);
    return NextResponse.json({ message: "Beklenmedik Sunucu Hatası" }, { status: 500 });
  }
}