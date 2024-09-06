// app/api/exam/dgs/route.ts

import { NextRequest, NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import KpssModel from "@/lib/models/exam-models/kpss.model";
import connectDB from "@/lib/config/connectDB";

export async function GET(request: NextRequest) {
  try {
    const { userId } = getAuth(request);
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    await connectDB();
    const exams = await KpssModel.find({ clerkId : userId });
    return NextResponse.json(exams,{status: 200});
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
    
}

export async function POST(request: NextRequest) {
  try {
    const { userId } = getAuth(request);
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    if (!body) {
      return NextResponse.json({ error: "Request body is empty" }, { status: 400 });
    }
    await connectDB();
    const exam = new KpssModel({
      clerkId: userId,
      ...body
    });
    
    await exam.save();
    return NextResponse.json({ status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}