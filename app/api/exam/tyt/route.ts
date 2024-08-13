// app/api/exam/tyt/route.ts

import { NextRequest, NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import TytModel from "@/lib/models/exam-models/tyt.model";

export async function GET(request: NextRequest) {
  try {
    const { userId } = getAuth(request);
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const exams = await TytModel.find({ clerkId : userId });
    return NextResponse.json(exams);
  } catch (error) {
    console.error("Error processing request:", error);
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
    console.log("Parsed body:", body);
    if (!body) {
      return NextResponse.json({ error: "Request body is empty" }, { status: 400 });
    }

    const exam = new TytModel({
      clerkId: userId,
      ...body
    });

    await exam.save();
    return NextResponse.json(exam, { status: 201 });
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}