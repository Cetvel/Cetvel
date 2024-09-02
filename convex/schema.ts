import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineSchema({
    notification: defineTable({
        clerkId: v.string(),
        message: v.string(),
        sent: v.boolean(),
        type: v.string(),
        read: v.boolean(),
    }),
    user: defineTable({
        email: v.optional(v.string()),
        clerkId: v.string(),
        mongoId: v.string(),
        coverPhotoId: v.optional(v.id("_storage")),
        timerPhotoId: v.optional(v.id("_storage")),
    }),
    userPreferences: defineTable({
        notification : v.boolean(),
        clerkId: v.string(),
        userId: v.string(),
        todoReminder: v.boolean(),
        todoReminderFrequency: v.number(),
        lastTodoReminder: v.optional(v.number()),
        pomodoroReminder: v.boolean(),
        weeklyReport: v.boolean(),
    })
});