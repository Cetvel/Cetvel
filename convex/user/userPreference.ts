import { mutation } from "../_generated/server";
import { v } from "convex/values";

export const createUserPreference = mutation({
    args: {
        clerkId: v.string(),
        userId: v.string(),
        notification: v.boolean(),
    },
    handler: async (ctx, { clerkId, userId,notification }) => {
        //default user preferences
        const newUserPreference = await ctx.db.insert("userPreferences", {
            notification,
            clerkId,
            userId,
            todoReminder: true,
            todoReminderFrequency: 2,
            pomodoroReminder: true,
            weeklyReport: true
        })

        if (!newUserPreference) {
            throw new Error("User Preference could not be created")
        }

        return newUserPreference
    }
}
)

