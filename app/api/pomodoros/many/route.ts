import Pomodoro from '@/lib/models/pomodoro.model';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import connectDB from '@/lib/config/connectDB';
import { getAuth } from '@clerk/nextjs/server';

export async function DELETE(req: NextRequest) {
    try {
        const { userId } = getAuth(req);
        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        // developments commit
        await connectDB()
        const { ids } = await req.json();
        if (ids && Array.isArray(ids)) {
            await Pomodoro.deleteMany({ _id: { $in: ids } });
            return NextResponse.json({ status: 200 });
        } else {
            return NextResponse.json({ error: 'Hatalı istek' }, { status: 400 });
        }
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function PUT(req: NextRequest) {
    try {

        const { userId } = getAuth(req);
        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { ids, updateData } = await req.json();

        await connectDB();

        if (ids && Array.isArray(ids)) {
            await Pomodoro.updateMany(
                { _id: { $in: ids } },
                { $set: updateData }
            );
            return NextResponse.json({ status: 200 });
        } else {
            return NextResponse.json({ error: 'Hatalı istek' }, { status: 400 });
        }
    }
    catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}