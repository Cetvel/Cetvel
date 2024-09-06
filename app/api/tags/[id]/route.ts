import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import TagModel from "@/lib/models/tag.model";
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

        await connectDB();
        const body = await request.json();
        const tag = await TagModel.findOneAndUpdate({ _id: id }, body, { new: true });
        if (!tag) {
            return NextResponse.json({ error: "tag not found" }, { status: 404 });
        }
        return NextResponse.json({ status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }

}


export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const { userId } = getAuth(request);
        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { id } = params;
        if (!id) {
            return NextResponse.json({ error: "Request body is empty" }, { status: 400 });
        }
        await connectDB();
        const tag = await TagModel.findOneAndDelete({ _id: id });
        if (!tag) {
            return NextResponse.json({ error: "tag not found" }, { status: 404 });
        }
        return NextResponse.json({ status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}