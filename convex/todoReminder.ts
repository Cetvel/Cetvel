import { internalAction, internalMutation } from "./_generated/server";
import { v } from "convex/values";
import { internal } from "./_generated/api";

export const checkAndProduceTodoReminder = internalAction({
    args: {
        userId : v.string(),
        currentTime : v.number(),
        frequency : v.number(),
        lastReminder : v.optional(v.number())
    },
    handler : async (ctx, {userId, currentTime,frequency,lastReminder}) => {
        try {
            const hoursSinceLastReminder = (currentTime - (lastReminder || 0)) / (1000 * 60 * 60);

            if (hoursSinceLastReminder < frequency) {
                return
            }
            const todoCounts = await ctx.runAction(internal.todoReminderHelpers.fetchTodoCounts, {userId});
            await ctx.runMutation(internal.todoReminderHelpers.createTodoReminder, {todoCounts, userId});
            
        } catch (error) {
            throw new Error("Görev Hatırlatıcı Sisteminde bir hata çıktı " + error);
        }
    }
})