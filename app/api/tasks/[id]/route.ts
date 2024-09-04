import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import TodoModel from "@/lib/models/todo.model";

export async function PUT(request:NextRequest , { params }: { params: { id: string } }) {
    const { userId } = getAuth(request);
    if (!userId) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    const { id } = params;
    if (!id) {
        return NextResponse.json({ error: "Request body is empty" }, { status: 400 });
    }
    
    const body = await request.json();
    const todo = await TodoModel.findOneAndUpdate({ _id: id }, body, { new: true });
    if (!todo) {
        return NextResponse.json({ error: "Todo not found" }, { status: 404 });
    }
    return NextResponse.json(todo);
}


export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    const { userId } = getAuth(request);
    if (!userId) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    const { id } = params;
    if (!id) {
        return NextResponse.json({ error: "Request body is empty" }, { status: 400 });
    }
    
    const todo = await TodoModel.findOneAndDelete({ _id: id});
    if (!todo) {
        return NextResponse.json({ error: "Todo not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Todo deleted successfully" });
}