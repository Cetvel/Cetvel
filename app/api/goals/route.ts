import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import GoalModel from "@/lib/models/goal.model";
import { IGoalDocument } from "@/lib/models/goal.model";
import connectDB from "@/lib/config/connectDB";

export async function GET(request: NextRequest) {
    try {
        const { userId } = getAuth(request);
        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        await connectDB();
        const goals = await GoalModel.find({ clerkId: userId });
        return NextResponse.json(goals, { status: 200 });
    } catch (error) {
        console.log("error oldu hocam")
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }

}

export async function POST(request: NextRequest) {
    try {

        const { userId } = getAuth(request);
        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await request.json();
        if (!body) {
            return NextResponse.json({ error: "Request body is empty" }, { status: 400 });
        }
        await connectDB();

        const goal = new GoalModel({
            clerkId: userId,
            ...body
        }) as IGoalDocument

        await goal.save();
        return NextResponse.json({ status: 201 });
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

