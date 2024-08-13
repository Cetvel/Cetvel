import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import GoalModel from "@/lib/models/goal.model";

export async function PUT(request:NextRequest , { params }: { params: { id: string } }) {
    const { userId } = getAuth(request);
    if (!userId) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    const { id } = params;
    if (!id) {
        return NextResponse.json({ error: "Request body is empty" }, { status: 400 });
    }
    
    const body = await request.json();
    const goal = await GoalModel.findOneAndUpdate({ _id: id }, body, { new: true });
    if (!goal) {
        return NextResponse.json({ error: "goal not found" }, { status: 404 });
    }
    return NextResponse.json(goal);
}


export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    const { userId } = getAuth(request);
    if (!userId) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    const { id } = params;
    if (!id) {
        return NextResponse.json({ error: "Request body is empty" }, { status: 400 });
    }
    
    const goal = await GoalModel.findOneAndDelete({ _id: id});
    if (!goal) {
        return NextResponse.json({ error: "goal not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "goal deleted successfully" });
}