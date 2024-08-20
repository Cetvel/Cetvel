import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import BranchExam, {IBranchDocument}from "@/lib/models/exam-models/branch.model";

export async function GET(request:NextRequest , { params }: { params: { type: string } }) {
    const { userId } = getAuth(request);
    if (!userId) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const { type } = params;
    const exams = await BranchExam.find({ clerkId: getAuth(request).userId, type });
    return NextResponse.json(exams);
}

export async function POST(request:NextRequest , { params }: { params: { type: string } }) {
    const { userId } = getAuth(request);
    if (!userId) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const { type } = params;
    
    const body = await request.json();
    console.log(body)
    if (!body) {
        return NextResponse.json({ error: "Request body is empty" }, { status: 400 });
    }
    const branchExam = new BranchExam({
        clerkId: getAuth(request).userId,
        type,
        ...body,
    }) ;

    console.log(branchExam.getTotal())
    await branchExam.save();
    return NextResponse.json(branchExam) ;
}