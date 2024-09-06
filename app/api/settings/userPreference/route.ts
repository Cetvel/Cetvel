import { NextResponse, NextRequest } from "next/server";
import { ConvexHttpClient } from 'convex/browser';
import { api } from "@/convex/_generated/api";
import { getAuth } from "@clerk/nextjs/server";
const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);


export async function PUT(req: NextRequest, res: NextResponse) {
    try {
        const clerkId = getAuth(req).userId
        if (!clerkId) return NextResponse.json({ error: "unauthorized" }, { status: 401 })

        await convex.mutation(
            api.user.userPreference.updateUserPreference,
            { clerkId, props: req.body }
        )
        return NextResponse.json({ status: 200 })
    } catch (error: any) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}