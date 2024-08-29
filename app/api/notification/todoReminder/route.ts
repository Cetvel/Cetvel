import Todo from "@/lib/models/todo.model";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {

  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Türkiye saatine göre (UTC+3) şu anki zamanı al
  const now = new Date();
  const turkeyOffset = 3 * 60 * 60 * 1000; // 3 saat
  const turkeyTime = new Date(now.getTime() + turkeyOffset);

  // Türkiye saatine göre günün başlangıcı ve sonu
  const startOfDay = new Date(turkeyTime);
  startOfDay.setHours(0, 0, 0, 0);
  const endOfDay = new Date(turkeyTime);
  endOfDay.setHours(23, 59, 59, 999);

  try {
    const todos = await Todo.find({
      clerkId: userId,
      status: 'incomplete',
      startsAt: { $lte: endOfDay },
      endsAt: { $gte: startOfDay }
    });

    const count = todos.length;
    return NextResponse.json({ count },{ status: 200});
    } catch (error) {
    console.error("Error fetching todos:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}