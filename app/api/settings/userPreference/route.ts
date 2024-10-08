import { NextResponse, NextRequest } from "next/server";
import { ConvexHttpClient } from 'convex/browser';
import { api } from "@/convex/_generated/api";
import { getAuth, clerkClient } from "@clerk/nextjs/server";
import User from '@/lib/models/user.model';
import connectDB from '@/lib/config/connectDB';

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);



export async function PUT(req: NextRequest, res: NextResponse) {
    try {
        const kindeId = getAuth(req).userId
        if (!kindeId) return NextResponse.json({ error: "Yetkilendirme Hatası" }, { status: 401 })

        const {
            field, // ayt alani
            grade,// sinifi sayi cinsinden 
            notifications, // booelan
            todoReminders, // boolean
            todoReminderFrequencyHours // number  
        } = await req.json()

        const props = {
            todoReminderFrequencyHours,
            todoReminders,
            notifications
        }

        await clerkClient().users.updateUser(kindeId, {
            publicMetadata: {
                field,
                grade,
                notifications,
            },
        });

        await connectDB()
        const user = await User.findOneAndUpdate(
            { kindeId },
            { field, grade },
            { new: true }
        );
        if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });

        await convex.mutation(
            api.user.userPreference.updateUserPreference,
            { kindeId, props }
        )
        return NextResponse.json({ status: 200 })
    } catch (error: any) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}