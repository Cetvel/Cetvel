import { internal } from "./_generated/api";
import { internalAction, internalQuery } from "./_generated/server";


export const produceNotifications = internalAction({
    handler: async (ctx) => {
        const allPreferences = await ctx.runQuery(internal.notificationProduction.getAllPreferences);
        console.log(allPreferences);
        const currentTime = Date.now();

        for (const userPref of allPreferences) {
            if(!userPref.notification) return 
            if (userPref.todoReminder) {
                await ctx.runAction(internal.todoReminder.checkAndProduceTodoReminder, {
                    userId: userPref.clerkId,
                    currentTime,
                    frequency : userPref.todoReminderFrequency,
                    lastReminder : userPref.lastTodoReminder
                })
            }
            // if (userPref.pomodoroReminder) {
            //     await ctx.runMutation(internal.pomodoroReminder.checkPomodoroStatus);
            // }
        }
    },
});

export const getAllPreferences = internalQuery({
    handler: async (ctx) => {
        return ctx.db.query("userPreferences").collect()
    }
})