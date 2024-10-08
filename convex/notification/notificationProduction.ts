import { internal } from "../_generated/api";
import { internalAction, internalQuery } from "../_generated/server";

export const produceNotifications = internalAction({
    handler: async (ctx) => {
        try {
            const allPreferences = await ctx.runQuery(internal.notification.notificationProduction.getAllPreferences);
            const currentTime = Date.now();

            for (const userPref of allPreferences) {
                if (!userPref.notifications) return
                if (userPref.todoReminders) {
                    await ctx.runAction(internal.notification.todoReminder.checkAndProduceTodoReminder, {
                        kindeId: userPref.kindeId,
                        currentTime,
                        frequency: userPref.todoReminderFrequency,
                        lastReminder: userPref.lastTodoReminder
                    })
                }
                // if (userPref.pomodoroReminder) {
                //     await ctx.runMutation(internal.pomodoroReminder.checkPomodoroStatus);
                // }
            }
        } catch (error: any) {
            throw new Error(error)
        }

    }
});

export const getAllPreferences = internalQuery({
    handler: async (ctx) => {
        try {
            return ctx.db.query("userPreferences").collect()
        } catch (error: any) {
            throw new Error(error)
        }
    }
})