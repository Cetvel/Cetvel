import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import TytModel from "@/lib/models/exam-models/tyt.model";

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
    const tyt = await TytModel.findOneAndUpdate({ _id: id }, body, { new: true });
    if (!tyt) {
        return NextResponse.json({ error: "tyt not found" }, { status: 404 });
    }
    return NextResponse.json(tyt);
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
    
    const tyt = await TytModel.findOneAndDelete({ _id: id});
    if (!tyt) {
        return NextResponse.json({ error: "tyt not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "tyt deleted successfully" });
}