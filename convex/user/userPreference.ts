import { internalMutation, mutation } from "../_generated/server";
import { v } from "convex/values";

export const createUserPreference = mutation({
    args: {
        kindeId: v.string(),
        userId: v.id("user"),
    },
    handler: async (ctx, { kindeId, userId }) => {
        try {
            const newUserPreference = await ctx.db.insert("userPreferences", {
                notifications: true,
                userId,
                kindeId,
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
        kindeId: v.string(),
        props: v.any()
    },
    handler: async (ctx, { kindeId, props }) => {
        try {
            const userPreferenceToUpdate = await ctx.db
                .query("userPreferences")
                .filter((q) => q.eq(q.field("kindeId"), kindeId))
                .first();

            if (!userPreferenceToUpdate) {
                throw new Error(`User Preference with kindeId ${kindeId} not found`);
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
        kindeId: v.string(),
        props: v.object({
            notification: v.optional(v.boolean()),
            todoReminder: v.optional(v.boolean()),
            todoReminderFrequency: v.optional(v.number()),
            lastTodoReminder: v.optional(v.number()),
            pomodoroReminder: v.optional(v.boolean()),
            weeklyReport: v.optional(v.boolean()),
        })
    },
    handler: async (ctx, { kindeId, props }) => {
        try {
            const userPreferenceToUpdate = await ctx.db
                .query("userPreferences")
                .filter((q) => q.eq(q.field("kindeId"), kindeId))
                .first();

            // Eğer kullanıcı bulunamazsa, hata fırlat
            if (!userPreferenceToUpdate) {
                throw new Error(`User Preference with kindeId ${kindeId} not found`);
            }

            // Kullanıcıyı sil
            await ctx.db.patch(userPreferenceToUpdate._id, { ...props });
            return userPreferenceToUpdate
        } catch (error) {
            throw new Error("Kullanıcı tercihi güncellenemedi")
        }

    }
})
