import { NextRequest, NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import ExamModel from "@/lib/models/exam.model";
import NodeCache from 'node-cache';
import connectDB from "@/lib/config/connectDB";

const cache = new NodeCache({ stdTTL: 300 });
export async function GET(request: NextRequest) {
  try {
    const { userId } = getAuth(request);
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const cacheKey = `exams_${userId}_${new Date().toDateString()}`;

    // Cache'den veriyi kontrol et
    const cachedData = cache.get(cacheKey);
    if (cachedData) {
      console.log(cachedData)
      return NextResponse.json(cachedData, {
        status: 200,
        headers: {
          'X-Cache-Status': 'HIT'
        }
      });
    }
    await connectDB();
    const exams = await ExamModel.find({ clerkId: userId });
    cache.set(cacheKey, exams)
    return NextResponse.json(exams, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }

}
