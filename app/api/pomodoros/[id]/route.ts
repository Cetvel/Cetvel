import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import PomodoroModel from "@/lib/models/pomodoro.model";
import connectDB from "@/lib/config/connectDB";
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const { userId } = getAuth(request);
        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { id } = params;
        if (!id) {
            return NextResponse.json({ error: "Request body is empty" }, { status: 400 });
        }

        const body = await request.json();
        if (!body) {
            return NextResponse.json({ error: "Request body is empty" }, { status: 400 });
        }
        await connectDB();
        const pomodoro = await PomodoroModel.findOneAndUpdate({ _id: id }, body, { new: true });
        if (!pomodoro) {
            return NextResponse.json({ error: "pomodoro not found" }, { status: 404 });
        }
        return NextResponse.json({ status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}


export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const { userId } = getAuth(request);
        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { id } = params;
        if (!id) {
            return NextResponse.json({ error: "Request body is empty" }, { status: 400 });
        }
        await connectDB();
        const pomodoro = await PomodoroModel.findOneAndDelete({ _id: id });
        if (!pomodoro) {
            return NextResponse.json({ error: "pomodoro not found" }, { status: 404 });
        }
        return NextResponse.json({ status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}