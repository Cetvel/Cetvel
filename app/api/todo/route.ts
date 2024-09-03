import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import TodoModel from "@/lib/models/todo.model";
import { ITodoDocument } from "@/lib/models/todo.model";

export async function GET(request: NextRequest) {
  if (!getAuth(request).userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // URL'den query parametrelerini al
  const searchParams = request.nextUrl.searchParams;
  const page = parseInt(searchParams.get('page') || '1', 10);
  const limit = parseInt(searchParams.get('limit') || '10', 10);

  // Sayfa ve limit değerlerini doğrula
  if (isNaN(page) || isNaN(limit) || page < 1 || limit < 1) {
    return NextResponse.json({ error: "Geçersiz sayfa sayısı veya limit" }, { status: 400 });
  }

  const skip = (page - 1) * limit;

  try {
    // Toplam todo sayısını al
    const totalTodos = await TodoModel.countDocuments({ clerkId: getAuth(request).userId! });

    // Paginasyonlu todo verilerini al
    const todos = await TodoModel.find({ clerkId: getAuth(request).userId! })
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    // Toplam sayfa sayısını hesapla
    const totalPages = Math.ceil(totalTodos / limit);

    return NextResponse.json({
      todos,
      currentPage: page,
      totalPages,
      totalTodos,
    });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log("Parsed body:", body);
    if (!body) {
      return NextResponse.json(
        { error: "Request body is empty" },
        { status: 400 }
      );
    }
    const { userId } = getAuth(request);
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!body.tag) return NextResponse.json({ error: "Etiket gereklidir" }, { status: 400 });

    // Todo oluştur
    const todo = new TodoModel({
      clerkId: getAuth(request).userId,
      ...body,
    }) as ITodoDocument;

    await todo.save();
    const response = NextResponse.json(todo, { status: 201 });
    response.headers.set(
      "Cache-Control",
      "s-maxage=60, stale-while-revalidate"
    );
    return response;
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
