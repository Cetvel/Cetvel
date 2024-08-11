import type { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import { getUserByClerkId } from "@/lib/services/user.service";

export async function GET(req: NextApiRequest) {
    const { userId } = getAuth(req);
    const user = await getUserByClerkId(userId!)
    return NextResponse.json({user});

}

