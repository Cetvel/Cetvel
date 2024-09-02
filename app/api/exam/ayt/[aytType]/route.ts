import { NextRequest, NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import AytModel from "@/lib/models/exam-models/ayt.model";
import { AytDocument } from "@/lib/models/exam-models/ayt.model";

export async function GET(request: NextRequest, { params }: { params: { aytType: string } }) {
    try {
        const { userId } = getAuth(request);
        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        const { aytType } = params;
        console.log("aytType:", aytType);
        if (aytType !== 'say' && aytType !== 'ea' && aytType !== 'soz') return NextResponse.json({ error: "Geçerli bir Ayt formatı giriniz." }, { status: 400 });
        const exams = await AytModel.find({ clerkId: userId, aytType }) as AytDocument[];
        return NextResponse.json(exams);
    } catch (error) {
        console.error("Error processing request:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }

}

export async function POST(request: NextRequest, { params }: { params: { aytType: string } }) {
    try {
        const { userId } = getAuth(request);
        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { aytType } = params;
        if (aytType !== 'say' && aytType !== 'ea' && aytType !== 'soz') return NextResponse.json({ error: "Geçerli bir Ayt formatı giriniz." }, { status: 400 });
        const body = await request.json();
        
        if (!body) {
            return NextResponse.json({ error: "Request body is empty" }, { status: 400 });
        }

        const exam = new AytModel({
            clerkId: userId,
            aytField: aytType,
            ...body
        }) as AytDocument

        await exam.save();
        return NextResponse.json(exam, { status: 201 });
    } catch (error) {
        console.error("Error processing request:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}