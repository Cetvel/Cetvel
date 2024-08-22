import { internalMutation } from "../_generated/server";
import { v } from "convex/values";

export const createUserPreference = internalMutation({
    args: {
        clerkId: v.string(),
        userId: v.string(),
    },
    handler: async (ctx, { clerkId, userId }) => {
        //default user preferences
        const newUserPreference = await ctx.db.insert("userPreferences", {
             clerkId, 
             userId, 
             todoReminder: true, 
             todoReminderFrequency : 2, 
             pomodoroReminder : true, 
             weeklyReport : true})

        if (!newUserPreference) {
            throw new Error("User Preference could not be created")
        }

        return newUserPreference
    }
}
)

export const insertUser = internalMutation({
    args: {
        clerkId: v.string(),
        mongoId: v.string(),
        name: v.string()
    },
    handler: async (ctx, { clerkId, mongoId, name }) => {
        const newUser = await ctx.db.insert("user", { clerkId, mongoId, name })
        if (!newUser) {
            throw new Error("User could not be created")
        }

        return newUser
    }
}) 