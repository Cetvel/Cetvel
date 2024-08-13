import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import GoalModel from "@/lib/models/goal.model";
import { IGoalDocument } from "@/lib/models/goal.model";

export async function GET(request: NextRequest) {
    const goals = await GoalModel.find({ clerkId: getAuth(request).userId });
    return NextResponse.json(goals);
}

export async function POST(request: NextRequest) {
    try {
       
        const { userId } = getAuth(request);
        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
       
        const body = await request.json();
        console.log("Parsed body:", body);
        if (!body) {
            return NextResponse.json({ error: "Request body is empty" }, { status: 400 });
        }
       

        // goal oluştur
        const goal = new GoalModel({
            clerkId: userId,
            ...body
        }) as IGoalDocument

        await goal.save();
        return NextResponse.json(goal, { status: 201 });
    } catch (error) {
        console.error("Error processing request:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

