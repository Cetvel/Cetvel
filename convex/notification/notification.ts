import { query, mutation, internalMutation } from '../_generated/server';
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
            return notifications.reverse();
        } catch (error: any) {
            throw new Error(error);
        }
    }
})


export const deleteNotification = mutation({
    args: { id: v.id("notification") },
    handler: async (ctx, args) => {
        try {
            await ctx.db.delete(args.id);
        } catch (error: any) {
            throw new Error(error);
        }
    },
});

export const deleteManyNotification = mutation({
    args: {
        ids: v.array(v.id("notification"))
    },
    handler: async (ctx, ids) => {
        try {
            ids.ids.forEach(async (id) => {
                await ctx.db.delete(id);
            })
        } catch (error: any) {
            throw new Error(error);
        }
    },
});

export const readNotification = mutation({
    args: { id: v.id("notification") },
    handler: async (ctx, args) => {
        try {
            const now = Date.now();
            await ctx.db.patch(args.id, { 
                read: true,
                ttl :  now + 1000 * 60 * 60 * 24 * 2
            });
        } catch (error: any) {
            throw new Error(error);
        }
    },
})

export const readManyNotification = mutation({
    args: {
        ids: v.array(v.id("notification"))
    },
    handler: async (ctx, ids) => {
        try {
            ids.ids.forEach(async (id) => {
                const now = Date.now();
                await ctx.db.patch(id, { 
                    read: true,
                    ttl :  now + 1000 * 60 * 60 * 24 * 1
                });
            })
        } catch (error: any) {
            throw new Error(error);
        }
    },
})

export const deleteExpiredNotifications = internalMutation({
    handler: async (ctx) => {
        const now = Date.now();
        const expiredDocs = await ctx.db
            .query('notification')
            .filter(q => q.neq(q.field('ttl'), 0))
            .filter(q => q.lt(q.field('ttl'), now))
            .collect();

        for (const doc of expiredDocs) {
            await ctx.db.delete(doc._id);
        }
    }
})
