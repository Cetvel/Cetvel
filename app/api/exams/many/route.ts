import Exam from '@/lib/models/exam.model';
import { NextResponse, NextRequest } from 'next/server';
import connectDB from '@/lib/config/connectDB';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
const { getUser } = getKindeServerSession();

export async function DELETE(req: NextRequest) {
    try {
        const kindeUser = await getUser()
        const userId = kindeUser.id
        if (!userId) {
            return NextResponse.json({ error: "Yetkilendirme Hatası" }, { status: 401 });
        }

        const { ids } = await req.json();
        if (ids && Array.isArray(ids)) {
            await connectDB();
            await Exam.deleteMany({ _id: { $in: ids } });
            return NextResponse.json({ status: 200 });
        } else {
            return NextResponse.json({ error: 'Hatalı istek' }, { status: 400 });
        }
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function PUT(req: NextRequest) {
    const kindeUser = await getUser()
    const userId = kindeUser.id
    if (!userId) {
        return NextResponse.json({ error: "Yetkilendirme Hatası" }, { status: 401 });
    }
    try {
        const { ids, updateData } = await req.json();

        if (ids && Array.isArray(ids)) {
            await connectDB();
            await Exam.updateMany(
                { _id: { $in: ids } },
                { $set: updateData }
            );
            return NextResponse.json({ status: 200 });
        }
    }
    catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}