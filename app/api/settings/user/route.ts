import { NextRequest, NextResponse } from 'next/server';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import getM2MToken from '@/lib/m2m_token';
import { Users, init } from "@kinde/management-api-js";
import UserMongo from '@/lib/models/user.model';
init();

init();

export async function PUT(req: NextRequest) {
    try {
        const { getUser } = getKindeServerSession();
        const user = await getUser();

        if (!user) {
            console.warn('PUT request: User not authenticated');
            return NextResponse.json({ message: 'Yetkilendirme Hatası' }, { status: 401 });
        }

        const { username, given_name, family_name } = await req.json();
        await Users.updateUser({
            id: user.id,
            requestBody: {
                given_name,
                family_name
            }
        })
        
        await Users.createUserIdentity({
            userId: user.id,
            requestBody: {
                value: username,
                type: "username"
            }
        })

        return NextResponse.json({ status: 200 });
    } catch (error) {
        console.error('İşlem hatası:', error);
        return NextResponse.json({ message: "Beklenmedik Sunucu Hatası" }, { status: 500 });
    }
}


export async function DELETE(req: NextRequest) {
    try {
        const { getUser } = getKindeServerSession();
        const user = await getUser();

        if (!user) {
            console.warn('Yetkilendirme Hatası DELETE request: User not authenticated');
            return NextResponse.json({ message: 'Yetkilendirme Hatası' }, { status: 401 });
        }

        const response = await Users.deleteUser({
            id: user.id,
            isDeleteProfile: true
        })
        if (response.code === "OK") {
            return NextResponse.json({ status: 200 });
        } else {
            console.error('Kinde API Hatası:', response.message);
            return NextResponse.json({ message: "Beklenmedik Sunucu Hatası" }, { status: 500 });
        }
    } catch (error) {
        console.error('İşlem hatası:', error);
        return NextResponse.json({ message: "Beklenmedik Sunucu Hatası" }, { status: 500 });
    }
}