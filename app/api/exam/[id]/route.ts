import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import ExamModel from "@/lib/models/exam.model"

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
    const exam = await ExamModel.findOneAndUpdate({ _id: id }, body, { new: true });
    if (!exam) {
        return NextResponse.json({ error: "exam not found" }, { status: 404 });
    }
    return NextResponse.json(exam);
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
    
    const exam = await ExamModel.findOneAndDelete({ _id: id});
    if (!exam) {
        return NextResponse.json({ error: "exam not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "exam deleted successfully" });
}