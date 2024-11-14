import User from '@/features/users/models/user.model';
import { NextResponse } from 'next/server';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
const { getUser } = getKindeServerSession();

export async function POST() {

    try {
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
        
        await updateApiTenancyIfItNeeds(user);
        user.apiTenancy -= 1;
        await user.save();

        return NextResponse.json({ status: 200 });
    } catch (error) {
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 })
    }

}

const updateApiTenancyIfItNeeds = async (user: any) => {
    const today = new Date();
    const lastUpdate = new Date(user.lastApiTenancyUpdate);

    if (lastUpdate.getDate() !== today.getDate() ||
        lastUpdate.getMonth() !== today.getMonth() ||
        lastUpdate.getFullYear() !== today.getFullYear()) {

        user.apiTenancy = 5;
        user.lastApiTenancyUpdate = today;

        await user.save();
    }
};
