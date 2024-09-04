import { NextRequest, NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import ExamModel from "@/lib/models/exam.model";
import NodeCache from 'node-cache';

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
        headers: {
          'X-Cache-Status': 'HIT'
        }
      });
    }
    const exams = await ExamModel.find({ clerkId: userId });
    cache.set(cacheKey, exams)
    return NextResponse.json(exams);
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }

}
