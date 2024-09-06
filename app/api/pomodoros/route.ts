import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import PomodoroModel from "@/lib/models/pomodoro.model";
import { PomodoroDocument } from "@/lib/models/pomodoro.model";
<<<<<<< HEAD
import connectDB from "@/lib/config/connectDB";
=======
import connectDB from '@/lib/config/connectDB';
>>>>>>> 17fb4ad34c501c0b34d11b6fa101444dbef8945a


export async function GET(request: NextRequest) {
    if (!getAuth(request).userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  
    try {
      await connectDB();
<<<<<<< HEAD
      const pomodoros = await PomodoroModel.find({ clerkId: getAuth(request).userId });
      return NextResponse.json(pomodoros, {
        headers: {
          "X-Cache-Status": "MISS",
        },
      });
=======
      const totalPomodoros = await PomodoroModel.countDocuments({ clerkId: getAuth(request).userId! });
  
      const pomodoros = await PomodoroModel.find({ clerkId: getAuth(request).userId! })
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 });
  
      const totalPages = Math.ceil(totalPomodoros / limit);
  
      return NextResponse.json({
        pomodoros,
        currentPage: page,
        totalPages,
        totalPomodoros,
      },{status:200});
>>>>>>> 17fb4ad34c501c0b34d11b6fa101444dbef8945a
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