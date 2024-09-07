import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import TodoModel from "@/lib/models/todo.model";
import connectDB from "@/lib/config/connectDB";

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const { userId } = getAuth(request);
        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { id } = params;
        if (!id) {
            return NextResponse.json({ error: "Request body is empty" }, { status: 400 });
        }
        const body = await request.json();
        if (!body) {
            return NextResponse.json({ error: "Request body is empty" }, { status: 400 });
        }
        await connectDB();
        const todo = await TodoModel.findOneAndUpdate({ _id: id }, body, { new: true });
        if (!todo) {
            return NextResponse.json({ error: "Todo not found" }, { status: 404 });
        }
        return NextResponse.json({status: 200});
    } catch (error) {
        return NextResponse.json({error: "Internal Server Error" }, { status: 500 });    
    }
}


export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        
    } catch (error) {
        
    }
    const { userId } = getAuth(request);
    if (!userId) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = params;
    if (!id) {
        return NextResponse.json({ error: "Request body is empty" }, { status: 400 });
    }
    await connectDB();
    const todo = await TodoModel.findOneAndDelete({ _id: id });
    if (!todo) {
        return NextResponse.json({ error: "Todo not found" }, { status: 404 });
    }
    return NextResponse.json({ status : 200});
}