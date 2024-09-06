import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import PomodoroModel from "@/lib/models/pomodoro.model";
import { PomodoroDocument } from "@/lib/models/pomodoro.model";
import connectDB from '@/lib/config/connectDB';


export async function GET(request: NextRequest) {
    if (!getAuth(request).userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '10', 10);
  
    if (isNaN(page) || isNaN(limit) || page < 1 || limit < 1) {
      return NextResponse.json({ error: "Geçersiz sayfa sayısı veya limit" }, { status: 400 });
    }
  
    const skip = (page - 1) * limit;
  
    try {
      await connectDB();
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
        console.log("Parsed body:", body);
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