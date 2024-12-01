import User from '@/lib/models/user.model';
import { NextResponse } from 'next/server';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import connectDB from '@/lib/config/connectDB';

const { getUser } = getKindeServerSession();

export async function POST() {
    try {
        await connectDB();
        
        const kindeUser = await getUser();
        const userId = kindeUser?.id;
        
        if (!userId) {
            return NextResponse.json(
                { message: 'Yetkilendirme Hatası' },
                { status: 401 }
            );
        }

        const user = await User.findOne({ kindeId: userId });
        
        if (!user) {
            return NextResponse.json(
                { message: 'Kullanıcı bulunamadı' },
                { status: 404 }
            );
        }

        const updated = await updateApiTenancyIfNeeded(user);
        
        if (updated.apiTenancy <= 0) {
            return NextResponse.json(
                { message: 'API kullanım hakkınız tükenmiştir' },
                { status: 429 }
            );
        }

        user.apiTenancy = updated.apiTenancy - 1;
        await user.save();

        return NextResponse.json({ 
            status: 200,
            remainingCalls: user.apiTenancy 
        });

    } catch (error) {
        console.error('API çağrısı hatası:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}

const updateApiTenancyIfNeeded = async (user: any) => {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const lastUpdate = new Date(user.lastApiTenancyUpdate);
        lastUpdate.setHours(0, 0, 0, 0);

        if (lastUpdate.getTime() < today.getTime()) {
            user.apiTenancy = 5;
            user.lastApiTenancyUpdate = today;
            await user.save();
        }

        return user;
    } catch (error) {
        console.error('API tenancy güncelleme hatası:', error);
        throw error;
    }
};