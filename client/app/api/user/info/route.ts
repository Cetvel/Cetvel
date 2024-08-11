import type { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import { getUserByClerkId } from "@/lib/services/user.service";

export async function GET(
    req: NextApiRequest,
    res: NextApiResponse) {
    console.log(req)
    const { userId } = getAuth(req);
    const user = await getUserByClerkId(userId!)
    console.log("API/USER/INFO --> " , user)
    
    return NextResponse.json({ message: "Hello World", user});

}

