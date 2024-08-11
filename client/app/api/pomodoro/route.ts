import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import PomodoroModel from "@/lib/models/pomodoro.model";
import { PomodoroDocument } from "@/lib/models/pomodoro.model";

export async function GET(request: NextRequest) {
    const pomodoros = await PomodoroModel.find({ clerkId: getAuth(request).userId });
    return NextResponse.json(pomodoros);
}

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

        // Pomodoro oluştur
        const pomodoro = new PomodoroModel({
            clerkId: getAuth(request).userId,
            ...body
        }) as PomodoroDocument

        await pomodoro.save();
        return NextResponse.json(pomodoro, { status: 201 });
    } catch (error) {
        console.error("Error processing request:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}