import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import PomodoroModel from "@/lib/models/pomodoro.model";
import { PomodoroDocument } from "@/lib/models/pomodoro.model";
import connectDB from "@/lib/config/connectDB";


export async function GET(request: NextRequest) {
    if (!getAuth(request).userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  
    try {
      await connectDB();
      const pomodoros = await PomodoroModel.find({ clerkId: getAuth(request).userId });
      return NextResponse.json(pomodoros, {
        headers: {
          "X-Cache-Status": "MISS",
        },
      });
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
        const pomodoro = new PomodoroModel({
            clerkId: getAuth(request).userId,
            ...body
        }) as PomodoroDocument
        
        await pomodoro.save();
        return NextResponse.json({ status: 201 });
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}