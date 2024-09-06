import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import TagModel from "@/lib/models/tag.model";
import { ITagDocument } from "@/lib/models/tag.model";
import connectDB from "@/lib/config/connectDB";

export async function GET(request: NextRequest) {
    try {
        if (!getAuth(request).userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }
        await connectDB();
        const tags = await TagModel.find({ clerkId: getAuth(request).userId });
        return NextResponse.json(tags, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }

}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        if (!body) {
            return NextResponse.json({ error: "Request body is empty" }, { status: 400 });
        }
        const { userId } = getAuth(request);
        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const isTagExist = await TagModel.countDocuments({ value: body.value, clerkId: userId });
        if (isTagExist) {
            return NextResponse.json({ error: "Bu etiketi zaten oluşturdunuz." }, { status: 400 });
        }
        // tag oluştur
        await connectDB()
        const tag = new TagModel({
            clerkId: getAuth(request).userId,
            ...body
        }) as ITagDocument

        await tag.save();
        return NextResponse.json({ status: 201 });
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

