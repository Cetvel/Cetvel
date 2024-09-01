import { query } from '../_generated/server';
import { v } from 'convex/values';

export const getNotifications = query({
    args: {
        clerkId: v.string(),
    },
    handler: async (ctx, { clerkId }) => {
        try {
            const notifications = await ctx.db
                .query("notification")
                .filter((q) => q.eq(q.field("clerkId"), clerkId))
                .collect()
            return notifications;
        } catch (error: any) {
            throw new Error(error);
        }
    }
})