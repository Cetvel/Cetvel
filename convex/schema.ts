import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineSchema({
    notification: defineTable({
        kindeId: v.string(),
        title: v.string(),
        message: v.string(),
        type: v.string(),
        timeStamp : v.number(),
        read: v.boolean(),
        ttl : v.number()
    }),
    user: defineTable({
        email: v.optional(v.array(v.string())),
        kindeId: v.string(),
        mongoId: v.string(),
        coverPhotoId: v.optional(v.id("_storage")),
        timerPhotoId: v.optional(v.id("_storage")),
    }),
    userPreferences: defineTable({
        notifications : v.boolean(),
        kindeId: v.string(),
        userId : v.id("user"),
        todoReminders: v.boolean(),
        todoReminderFrequency: v.number(),
        lastTodoReminder: v.optional(v.number()),
    })
});