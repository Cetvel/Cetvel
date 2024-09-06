import { NextRequest, NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import AytModel, { AytDocument } from "@/lib/models/exam-models/ayt.model";
import connectDB from "@/lib/config/connectDB";
export async function GET(request: NextRequest) {
  try {
    const { userId } = getAuth(request);
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB()
    
    const exams = await AytModel.find({ clerkId : userId }) as AytDocument[];
    
    return NextResponse.json(exams,{status: 200});
  
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
