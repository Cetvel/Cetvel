import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import TagModel from "@/lib/models/tag.model";

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
    const tag = await TagModel.findOneAndUpdate({ _id: id }, body, { new: true });
    if (!tag) {
        return NextResponse.json({ error: "tag not found" }, { status: 404 });
    }
    return NextResponse.json(tag);
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
    
    const tag = await TagModel.findOneAndDelete({ _id: id});
    if (!tag) {
        return NextResponse.json({ error: "tag not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "tag deleted successfully" });
}