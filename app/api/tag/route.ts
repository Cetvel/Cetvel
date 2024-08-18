import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import TagModel from "@/lib/models/tag.model";
import { ITagDocument } from "@/lib/models/tag.model";
export async function GET(request: NextRequest) {
    if (!getAuth(request).userId) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })}
    const tags = await TagModel.find({ clerkId: getAuth(request).userId });
    return NextResponse.json(tags);
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        console.log("Parsed body:", body);
        if (!body) {
            return NextResponse.json({ error: "Request body is empty" }, { status: 400 });
        }
        const { userId } = getAuth(request);
        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // tag oluştur
        const tag = new TagModel({
            clerkId: getAuth(request).userId,
            ...body
        }) as ITagDocument

        await tag.save();
        return NextResponse.json(tag, { status: 201 });
    } catch (error) {
        console.error("Error processing request:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

