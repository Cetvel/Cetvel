import { NextRequest, NextResponse } from "next/server";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
var { getUser } = getKindeServerSession();
import AytModel, { AytDocument } from "@/lib/models/exam-models/ayt.model";
import connectDB from "@/lib/config/connectDB";
export async function GET(request: NextRequest) {
  try {
    const kindeUser = await getUser();
    const userId = kindeUser?.id;
    if (!userId) {
      return NextResponse.json({ error: "Yetkilendirme Hatası" }, { status: 401 });
    }

    await connectDB()

    const exams = await AytModel.find({ kindeId: userId }) as AytDocument[];

    return NextResponse.json(exams, { status: 200 });

  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Beklenmedik Sunucu Hatası" }, { status: 500 });
  }
}
