import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import BranchExam, { IBranchDocument } from "@/lib/models/exam-models/branch.model";
import connectDB from "@/lib/config/connectDB";
import { stat } from "fs";
export async function GET(request: NextRequest, { params }: { params: { type: string } }) {
    try {
        const { userId } = getAuth(request);
        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        const { type } = params;

        await connectDB();
        const exams = await BranchExam.find({ clerkId: getAuth(request).userId, type });
        return NextResponse.json(exams, { status: 200 });

    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }

}

export async function POST(request: NextRequest, { params }: { params: { type: string } }) {
    try {
        const { userId } = getAuth(request);
        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        const { type } = params;

        const body = await request.json();

        if (!body) {
            return NextResponse.json({ error: "Request body is empty" }, { status: 400 });
        }

        await connectDB()
        const branchExam = new BranchExam({
            clerkId: getAuth(request).userId,
            type,
            ...body,
        });

        await branchExam.save();
        return NextResponse.json({ status: 201 });

    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}