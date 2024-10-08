import { NextRequest, NextResponse } from "next/server";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
var { getUser } = getKindeServerSession();
import DgsModel from "@/lib/models/exam-models/dgs.model";
import connectDB from "@/lib/config/connectDB";

export async function GET(request: NextRequest) {
  try {
    const kindeUser = await getUser();
    const userId = kindeUser?.id;
    if (!userId) {
      return NextResponse.json({ error: "Yetkilendirme Hatası" }, { status: 401 });
    }
    await connectDB();
    const exams = await DgsModel.find({ kindeId: userId });
    return NextResponse.json(exams, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Beklenmedik Sunucu Hatası" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const kindeUser = await getUser();
    const userId = kindeUser?.id;
    if (!userId) {
      return NextResponse.json({ error: "Yetkilendirme Hatası" }, { status: 401 });
    }

    const body = await request.json();

    await connectDB();
    const exam = new DgsModel({
      kindeId: userId,
      ...body
    });

    await exam.save();
    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Beklenmedik Sunucu Hatası" }, { status: 500 });
  }
}