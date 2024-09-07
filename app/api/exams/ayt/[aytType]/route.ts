import { NextRequest, NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import AytModel from "@/lib/models/exam-models/ayt.model";
import { AytDocument } from "@/lib/models/exam-models/ayt.model";
import connectDB from "@/lib/config/connectDB";
export async function GET(request: NextRequest, { params }: { params: { aytType: string } }) {
    try {
        const { userId } = getAuth(request);
        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { aytType } = params;

        if (aytType !== 'say' && aytType !== 'ea' && aytType !== 'soz') return NextResponse.json({ error: "Geçerli bir Ayt formatı giriniz." }, { status: 400 });
        let field
        switch (aytType) {
            case 'say':
                field = 'SAY'
                break;
            case 'ea':
                field = 'EA'
                break;
            case 'soz':
                field = 'SOZ'
                break;
        }


        await connectDB()
        const exams = await AytModel.find({
            clerkId: userId,
            aytType: field
        }) as AytDocument[];

        return NextResponse.json(exams, { status: 200 });
    } catch (error) {
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

        let field
        switch (aytType) {
            case 'say':
                field = 'SAY'
                break;
            case 'ea':
                field = 'EA'
                break;
            case 'soz':
                field = 'SOZ'
                break;
        }

        await connectDB()
        const exam = new AytModel({
            clerkId: userId,
            field,
            ...body
        }) as AytDocument

        await exam.save();
        return NextResponse.json({ status: 201 });
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}