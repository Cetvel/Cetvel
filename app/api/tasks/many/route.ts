import Todo from '@/lib/models/todo.model';
import { NextResponse, NextRequest } from 'next/server';
import connectDB from '@/lib/config/connectDB';
import { getAuth } from '@clerk/nextjs/server';


export async function DELETE(req: NextRequest) {
    const { userId } = getAuth(req);
    if (!userId) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const { ids } = await req.json();
        if (ids && Array.isArray(ids)) {
            await connectDB();
            await Todo.deleteMany({ _id: { $in: ids } });
            return NextResponse.json({ status: 200 });
        } else {
            return NextResponse.json({ error: 'Hatalı istek' }, { status: 400 });
        }
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function PUT(req: NextRequest) {
    const { userId } = getAuth(req);
    if (!userId) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    try {
        const { ids, updateData } = await req.json();

        if (ids && Array.isArray(ids)) {
            await connectDB();
            await Todo.updateMany(
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