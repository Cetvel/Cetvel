import { NextRequest, NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import Todo from "@/lib/models/todo.model";
import NodeCache from 'node-cache';
import connectDB from "@/lib/config/connectDB";

const cache = new NodeCache({ stdTTL: 300 });

export async function GET(request: NextRequest) {
  try {
    const { userId } = getAuth(request);
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Cache key oluştur
    const cacheKey = `todos_${userId}_${new Date().toDateString()}`;

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

    // Türkiye saat dilimi için offset (UTC+3)
    const turkeyOffset = 3 * 60 * 60 * 1000; // 3 saat milisaniye cinsinden
    // Şu anki Türkiye zamanı
    const nowInTurkey = new Date(Date.now() + turkeyOffset);
    // Türkiye'de bugünün başlangıcı (00:00)
    const todayStartInTurkey = new Date(nowInTurkey);
    todayStartInTurkey.setUTCHours(0, 0, 0, 0);
    // Türkiye'de bugünün sonu (23:59:59.999)
    const todayEndInTurkey = new Date(todayStartInTurkey);
    todayEndInTurkey.setUTCHours(23, 59, 59, 999);

    await connectDB();
    const todos = await Todo.find({
      clerkId: userId,
      $or: [
        // Başlangıç zamanı bugün içinde
        {
          startsAt: {
            $gte: new Date(todayStartInTurkey.getTime() - turkeyOffset),
            $lt: new Date(todayEndInTurkey.getTime() - turkeyOffset)
          }
        },
        // Bitiş zamanı bugün içinde
        {
          endsAt: {
            $gte: new Date(todayStartInTurkey.getTime() - turkeyOffset),
            $lt: new Date(todayEndInTurkey.getTime() - turkeyOffset)
          }
        },
        // Başlangıç zamanı bugünden önce ve bitiş zamanı bugünden sonra
        {
          startsAt: { $lt: new Date(todayStartInTurkey.getTime() - turkeyOffset) },
          endsAt: { $gt: new Date(todayEndInTurkey.getTime() - turkeyOffset) }
        }
      ]
    }).sort({ startsAt: 1 });

    cache.set(cacheKey, todos);

    return NextResponse.json(todos, {status : 200});
  } catch (error) {
    console.error("Error fetching todos:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}