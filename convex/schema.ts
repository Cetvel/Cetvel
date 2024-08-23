import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineSchema({
    notification: defineTable({
        userId: v.string(),
        message: v.string(),
        sent: v.boolean(),
        type: v.string(),
        read : v.boolean(),
    }),
    user: defineTable({
        name : v.string(),
        clerkId: v.string(),
        mongoId: v.string(),
    }),   
    userPreferences: defineTable({
        clerkId : v.string(),
        userId: v.string(),
        todoReminder: v.boolean(),
        todoReminderFrequency: v.number(),
        lastTodoReminder: v.optional(v.number()),
        pomodoroReminder: v.boolean(),
        weeklyReport: v.boolean(),
    })
});