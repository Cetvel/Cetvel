import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { auth, getAuth } from "@clerk/nextjs/server";
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
        if (goals == undefined) {
            console.log("goals could not find")
            return NextResponse.json({ error: "Internal Server Error" }, { status: 404 });
        }
        return NextResponse.json(goals, { status: 200 });
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {

        const { userId } = auth();
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

        try {
            await goal.save();
        } catch (err) {
            console.log(err);
            return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
        }

        return NextResponse.json({ status: 201 });
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

