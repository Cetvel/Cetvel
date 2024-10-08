import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
var { getUser } = getKindeServerSession();
import BranchExam, { BranchType } from "@/lib/models/exam-models/branch.model";
import connectDB from "@/lib/config/connectDB";
export async function GET(request: NextRequest, { params }: { params: { type: string } }) {
    try {
        const kindeUser = await getUser();
        const userId = kindeUser?.id;
        if (!userId) {
            return NextResponse.json({ error: "Yetkilendirme Hatası" }, { status: 401 });
        }
        const { type } = params;

        await connectDB();
        const exams = await BranchExam.find({ kindeId: userId, type });
        return NextResponse.json(exams, { status: 200 });

    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Beklenmedik Sunucu Hatası" }, { status: 500 });
    }

}

export async function POST(request: NextRequest, { params }: { params: { type: string } }) {
    try {
        const kindeUser = await getUser();
        const userId = kindeUser?.id;
        if (!userId) {
            return NextResponse.json({ error: "Yetkilendirme Hatası" }, { status: 401 });
        }
        const { type } = params;

        if (!Object.values(BranchType).includes(type as BranchType)) return NextResponse.json({ error: "Invalid branch type" }, { status: 400 });

        const body = await request.json();


        await connectDB()
        const branchExam = new BranchExam({
            kindeId: userId,
            type,
            ...body,
        });

        await branchExam.save();
        return NextResponse.json({ status: 200 });

    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Beklenmedik Sunucu Hatası" }, { status: 500 });
    }
}