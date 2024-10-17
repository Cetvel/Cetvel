import { NextRequest, NextResponse } from 'next/server';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';

const KINDE_CLIENT_ID = process.env.KINDE_M2M_CLIENT_ID!;
const KINDE_CLIENT_SECRET = process.env.KINDE_M2M_CLIENT_SECRET!;
const KINDE_DOMAIN = process.env.KINDE_ISSUER_URL!;

async function getM2MToken() {
    const tokenResponse = await fetch(`${KINDE_DOMAIN}/oauth2/token`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            grant_type: 'client_credentials',
            client_id: KINDE_CLIENT_ID,
            client_secret: KINDE_CLIENT_SECRET,
            audience: `${KINDE_DOMAIN}/api`
        })
    });

    if (!tokenResponse.ok) {
        throw new Error('Failed to get M2M token');
    }

    const tokenData = await tokenResponse.json();
    return tokenData.access_token;
}

export async function PUT(req: NextRequest) {
    try {
        // Kullanıcı kontrolü
        const { getUser } = getKindeServerSession();
        const user = await getUser();

        if (!user) {
            console.warn('Yetkilendirme Hatası PUT request: User not authenticated');
            return NextResponse.json({ message: 'Yetkilendirme Hatası' }, { status: 401 });
        }

        // Request body'den verileri al
        const { email, username } = await req.json();
        const m2mToken = await getM2MToken();
        console.log("m2mToken", m2mToken);
        console.log('Kullanıcı bilgileri:', { email, username, userId: user.id });
        // Kinde API isteği
        const response = await fetch(`https://cetvel.kinde.com/api/v1/user?id=${user.id}`, {
            method: 'PATCH',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${m2mToken}`,
            },
            body: JSON.stringify({
                email,
                given_name: username, 
            }),
        });

        // API yanıtını kontrol et
        if (!response.ok) {
            const errorText = await response.text(); // önce text olarak oku
            console.error('Kinde API Error:', {
                status: response.status,
                statusText: response.statusText,
                body: errorText
            });

            return NextResponse.json({
                message: "Beklenmedik Sunucu Hatası",
                details: errorText
            }, { status: response.status });
        }

        const data = await response.json();
        console.log('Başarılı yanıt:', data);

        return NextResponse.json({ success: true, data }, { status: 200 });

    } catch (error) {
        console.error('İşlem hatası:', error);
        return NextResponse.json({message: "Beklenmedik Sunucu Hatası"}, { status: 500 });
    }
}