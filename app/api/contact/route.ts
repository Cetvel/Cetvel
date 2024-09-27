import connectDB from "@/lib/config/connectDB";
import { NextRequest, NextResponse } from "next/server";
import Contact from "@/lib/models/contact.model";

/// some change
export async function POST(res:NextRequest) {
    try {
        await connectDB()
        const { name, email, message } = await res.json()
        Contact.create({ name, email, message })
        return NextResponse.json({ status: 201})
    } catch (error) {
        return NextResponse.json({ status: 500, error: "Internal server error" })
    }
}