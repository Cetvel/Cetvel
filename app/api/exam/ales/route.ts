// app/api/exam/dgs/route.ts

import { NextRequest, NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import AlesModel from "@/lib/models/exam-models/ales.model";

export async function GET(request: NextRequest) {
  try {
    const { userId } = getAuth(request);
    console.log("headers", request.headers)
    console.log("userId", userId)
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const exams = await AlesModel.find({ clerkId : userId });
    return NextResponse.json(exams);
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
    
}

export async function POST(request: NextRequest) {
  try {
    const { userId } = getAuth(request);
    console.log("headers", request.headers)
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    if (!body) {
      return NextResponse.json({ error: "Request body is empty" }, { status: 400 });
    }

    const exam = new AlesModel({
      clerkId: userId,
      ...body
    });
    
    await exam.save();
    console.log("exam", exam)
    return NextResponse.json(exam, { status: 201 });
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}