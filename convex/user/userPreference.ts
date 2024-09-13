import { internalMutation, mutation } from "../_generated/server";
import { v } from "convex/values";

export const createUserPreference = mutation({
    args: {
        clerkId: v.string(),
        userId: v.id("user"),
    },
    handler: async (ctx, { clerkId, userId }) => {
        try {
            const newUserPreference = await ctx.db.insert("userPreferences", {
                notifications: true,
                userId,
                clerkId,
                todoReminders: true,
                todoReminderFrequency: 2,
            })

            if (!newUserPreference) {
                throw new Error("User Preference could not be created")
            }

            return newUserPreference
        } catch (error) {
            throw new Error("Kullanıcı tercihi oluşturulurken bir hata oluştu.")
        }

    }
}
)

export const updateUserPreference = mutation({
    args: {
        clerkId: v.string(),
        props: v.any()
    },
    handler: async (ctx, { clerkId, props }) => {
        try {
            const userPreferenceToUpdate = await ctx.db
                .query("userPreferences")
                .filter((q) => q.eq(q.field("clerkId"), clerkId))
                .first();

            if (!userPreferenceToUpdate) {
                throw new Error(`User Preference with clerkId ${clerkId} not found`);
            }

            await ctx.db.patch(userPreferenceToUpdate._id, { ...props });
            return userPreferenceToUpdate
        } catch (error) {
            throw new Error("Kullanıcı tercihi güncellenirken bir hata oluştu.")
        }

    }
})

export const internal_UpdateUserPreference = internalMutation({
    args: {
        clerkId: v.string(),
        props: v.object({
            notification: v.optional(v.boolean()),
            todoReminder: v.optional(v.boolean()),
            todoReminderFrequency: v.optional(v.number()),
            lastTodoReminder: v.optional(v.number()),
            pomodoroReminder: v.optional(v.boolean()),
            weeklyReport: v.optional(v.boolean()),
        })
    },
    handler: async (ctx, { clerkId, props }) => {
        try {
            const userPreferenceToUpdate = await ctx.db
                .query("userPreferences")
                .filter((q) => q.eq(q.field("clerkId"), clerkId))
                .first();

            // Eğer kullanıcı bulunamazsa, hata fırlat
            if (!userPreferenceToUpdate) {
                throw new Error(`User Preference with clerkId ${clerkId} not found`);
            }

            // Kullanıcıyı sil
            await ctx.db.patch(userPreferenceToUpdate._id, { ...props });
            return userPreferenceToUpdate
        } catch (error) {
            throw new Error("Kullanıcı tercihi güncellenemedi")
        }

    }
})
