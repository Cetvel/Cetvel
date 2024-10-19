import { NextRequest, NextResponse } from 'next/server';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import getM2MToken from '@/lib/m2m_token';
import { Users, init } from "@kinde/management-api-js";
init();

export async function PUT(req: NextRequest) {
    try {
        const { getUser } = getKindeServerSession();
        const user = await getUser();

        if (!user) {
            console.warn('Yetkilendirme Hatası PUT request: User not authenticated');
            return NextResponse.json({ message: 'Yetkilendirme Hatası' }, { status: 401 });
        }
        //    requestBody={username,picture}
        const requestBody = await req.json();

        const accessToken = await getM2MToken();
        const response = await fetch(`https://cetvel.kinde.com/api/v1/user?id=${user.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify(requestBody)
        })

        if (!response.ok) {
            console.error('Kinde API Hatası:', response.statusText);
            return NextResponse.json({ message: "Kinde API Hatası" }, { status: 500 });
        }
        
        return NextResponse.json({ status: 200 });
    } catch (error) {
        console.error('İşlem hatası:', error);
        return NextResponse.json({ message: "Beklenmedik Sunucu Hatası" }, { status: 500 });
    }
}