import { NextRequest, NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import Todo from "@/lib/models/todo.model";
import connectDB from "@/lib/config/connectDB";

// Özel hata sınıfı
class APIError extends Error {
  constructor(
    public message: string,
    public statusCode: number,
    public originalError?: any
  ) {
    super(message);
    this.name = this.constructor.name;
  }
}

// Hata mesajlarını loglama fonksiyonu
function logError(error: any) {
  console.error("API Error:", {
    name: error.name,
    message: error.message,
    stack: error.stack,
    originalError: error.originalError
  });
}

// Hata yanıtı oluşturma fonksiyonu
function createErrorResponse(error: APIError | Error) {
  const isAPIError = error instanceof APIError;
  const statusCode = isAPIError ? error.statusCode : 500;
  const message = isAPIError ? error.message : "Internal Server Error";

  return NextResponse.json(
    {
      error: {
        message,
        ...(process.env.NODE_ENV === "development" && {
          stack: error.stack,
          originalError: isAPIError ? error.originalError : error
        })
      }
    },
    { status: statusCode }
  );
}

export async function GET(request: NextRequest) {
  try {
    const { userId } = getAuth(request);
    if (!userId) {
      throw new APIError("Unauthorized", 401);
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

    if (!todos || todos.length === 0) {
      return NextResponse.json({ message: "No todos found for today", data: [] }, { status: 200 });
    }

    return NextResponse.json({ message: "Todos retrieved successfully", data: todos }, { status: 200 });

  } catch (error) {
    if (error instanceof APIError) {
      logError(error);
      return createErrorResponse(error);
    }

    // Diğer hata türleri için
    let apiError: APIError;

    if (error instanceof Error) {
      // Genel JavaScript hataları
      apiError = new APIError(
        "An unexpected error occurred while processing your request",
        500,
        error
      );
    } else if (typeof error === 'string') {
      // String hata mesajları
      apiError = new APIError(error, 500);
    } else {
      // Diğer tüm durumlar
      apiError = new APIError(
        "An unknown error occurred",
        500,
        error
      );
    }

    logError(apiError);
    return createErrorResponse(apiError);
  }
}