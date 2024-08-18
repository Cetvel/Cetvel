import { internalMutation} from "./_generated/server";
import { v } from "convex/values";

export const createTodoReminderNoti = internalMutation({
    args: { userId: v.string(), message: v.string() },
    handler: async (ctx, { userId, message }) => {
        await ctx.db.insert( "todoReminder", { userId, message, sent: false });
    },
}); 