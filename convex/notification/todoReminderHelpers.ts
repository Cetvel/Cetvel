import { internalMutation, internalAction } from "../_generated/server";
import { v } from "convex/values";


export const fetchTodoCounts = internalAction({
    args: { kindeId: v.string() },
    handler: async (ctx, { kindeId }) => {
        try {
            const response = await fetch(`https://cetvel.app/api/notifications/todoReminder?kindeId=${kindeId}`);
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`API request failed with status ${response.status}: ${errorText}`);
            }
            const data = await response.json();
            return data.count
        } catch (error) {
            throw new Error("Görev sayısı alınırken bir hata çıktı " + error);
        }
    }
})


export const createTodoReminder = internalMutation({
    args: { kindeId: v.string(), todoCounts: v.number() },
    handler: async (ctx, { kindeId, todoCounts }) => {
        try {
            let message
            if (todoCounts > 0) {
                message = `Bugün bitirilmesi gereken ${todoCounts} göreviniz var.`
            } else {
                message = "Bugün yapılacak göreviniz yok. Oluşturmak ister misiniz?"
            }
            await ctx.db.insert("notification", {
                kindeId,
                title: "Görev Hatırlatıcısı",
                message,
                type: "info",
                timeStamp: Date.now(),
                read: false,
                ttl: 0
            },

            );
        } catch (error) {
            throw new Error("Görev hatırlatıcı oluşturulurken bir hata çıktı " + error);
        }
    },
});


