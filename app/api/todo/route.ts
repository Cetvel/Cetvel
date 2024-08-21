import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import TodoModel from "@/lib/models/todo.model";
import { ITodoDocument } from "@/lib/models/todo.model";
export async function GET(request: NextRequest) {
  if (!getAuth(request).userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const todos = await TodoModel.find({ clerkId: getAuth(request).userId });
  return NextResponse.json(todos);
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

    if(!body.tag) return NextResponse.json({error: "Etiket gereklidir"}, {status: 400});
    if(!body.title) return NextResponse.json({error: "Başlık gereklidir"}, {status: 400});

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
