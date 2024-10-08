import { internalAction, internalMutation } from "../_generated/server";
import { v } from "convex/values";
import { internal } from "../_generated/api";

export const checkAndProduceTodoReminder = internalAction({
    args: {
        kindeId: v.string(),
        currentTime: v.number(),
        frequency: v.number(),
        lastReminder: v.optional(v.number())
    },
    handler: async (ctx, { kindeId, currentTime, frequency, lastReminder }) => {
        try {
            const hoursSinceLastReminder = (currentTime - (lastReminder || 0)) / (1000 * 60 * 60);

            if (hoursSinceLastReminder < frequency) { 
                await ctx.runMutation(
                    internal.user.userPreference.internal_UpdateUserPreference, 
                    {
                        kindeId,
                        props: { todoReminder: true, lastTodoReminder: Date.now() }
                    });
                return
            }
            await ctx.runMutation(
                internal.user.userPreference.internal_UpdateUserPreference, 
                {
                    kindeId,
                    props: { todoReminder: true, lastTodoReminder: Date.now() }
                });
                
            const todoCounts = await ctx.runAction(internal.notification.todoReminderHelpers.fetchTodoCounts, { kindeId });
            await ctx.runMutation(internal.notification.todoReminderHelpers.createTodoReminder, { todoCounts, kindeId });

        } catch (error) {
            throw new Error("Görev Hatırlatıcı Sisteminde bir hata çıktı " + error);
        }
    }
})