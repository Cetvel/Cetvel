import type { NextApiRequest, NextApiResponse } from "next";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
// Mock data. Normally, you would interact with a database.
import { getUserByClerkId } from "@/lib/services/user.service"
import TodoModel from "@/lib/models/todo.model";
import { ITodoDocument } from "@/lib/models/todo.model";
// GET: Fetch all todos
export async function GET(request: NextApiRequest) {
    const todos = await TodoModel.find({ clerkId: getAuth(request).userId });
    return NextResponse.json(todos);
}

// POST: Add a new todo
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        console.log("Parsed body:", body);
        if (!body) {
            return NextResponse.json({ error: "Request body is empty" }, { status: 400 });
        }
        const { userId } = getAuth(request);
        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // Todo oluştur
        const todo = new TodoModel({
            clerkId: getAuth(request).userId,
            ...body
        }) as ITodoDocument

        // Veritabanına kaydet
        await todo.save();
        return NextResponse.json(todo, { status: 201 });
    } catch (error) {
        console.error("Error processing request:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

