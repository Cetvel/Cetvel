import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';
import { title } from 'process';

export default defineSchema({
    
    todoReminder: defineTable({
        userId: v.string(),
        message: v.string(),
        sent: v.boolean()
    }),
    
    
});