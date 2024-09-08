import { internalMutation, internalAction } from "../_generated/server";
import { v } from "convex/values";


export const fetchTodoCounts = internalAction({
    args: { clerkId: v.string() },
    handler: async (ctx, { clerkId }) => {
        try {
            const response = await fetch(`https://2af5-78-191-160-95.ngrok-free.app/api/notifications/todoReminder?clerkId=${clerkId}`);
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
    args: { clerkId: v.string(), todoCounts: v.number() },
    handler: async (ctx, { clerkId, todoCounts }) => {
        try {
            let message
            if (todoCounts > 0) {
                message = `Bugün bitirilmesi gereken ${todoCounts} göreviniz var.`
            } else {
                message = "Bugün yapılacak göreviniz yok. Oluşturmak ister misiniz?"
            }
            await ctx.db.insert("notification", {
                clerkId,
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


