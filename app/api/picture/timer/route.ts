import User from "@/lib/models/user.model";

import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import connectDB from '@/lib/config/connectDB';
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
const { getUser } = getKindeServerSession();
export async function PUT(req: NextRequest) {
    try {
        const kindeUser = await getUser();
        const userId = kindeUser?.id;
        if (!userId) {
            console.warn('Yetkilendirme Hatası PUT request: User not authenticated');
            return NextResponse.json({ message: 'Yetkilendirme Hatası: User not authenticated' }, { status: 401 });
        }

        const { url } = await req.json();
        await connectDB();
        const user = await User.findOneAndUpdate({ kindeId: userId }, { timer_picture: url }, { new: true });
        if (!user) {
            console.warn('PUT Request Error: User not found');
            return NextResponse.json({ message: 'PUT Request Error: User not found' }, { status: 404 });
        }
        console.log(user);
        return NextResponse.json({ status: 200 });
    } catch (error: any) {
        console.error('PUT Request Error:', error.message || error);
        return NextResponse.json({ message: "Beklenmedik Sunucu Hatası" }, { status: 500 });
    }
}