import { query } from './_generated/server';
import {v} from 'convex/values';

export const getNotifications = query({
  args: {
      clerkId: v.string(),
  },
  handler: async (ctx, { clerkId }) => {
      const notifications = await ctx.db
          .query("notification")
          .filter((q) => q.eq(q.field("userId"), clerkId))
          .collect()
      return notifications;
  },
});