import { NextRequest, NextResponse } from 'next/server';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import getM2MToken from '@/lib/m2m_token';
import { Users, init } from "@kinde/management-api-js";
init();

export async function PUT(req: NextRequest) {
    try {
        // Kullanıcı kontrolü
        const { getUser } = getKindeServerSession();
        const user = await getUser();

        if (!user) {
            console.warn('Yetkilendirme Hatası PUT request: User not authenticated');
            return NextResponse.json({ message: 'Yetkilendirme Hatası' }, { status: 401 });
        }

        const { grade, field, studyField } = await req.json();



        await Users.updateUserProperties({
            userId: user.id,
            requestBody: {
                properties: {
                    grade: grade.toString(),
                    field,
                    studyField
                }
            }
        }).catch((error) => {
            console.error('Kinde API Hatası:', error);
            return NextResponse.json({ message: "Kinde API Hatası" }, { status: 500 });
        })



        return NextResponse.json({ status: 200 });
    } catch (error) {
        console.error('İşlem hatası:', error);
        return NextResponse.json({ message: "Beklenmedik Sunucu Hatası" }, { status: 500 });
    }
}