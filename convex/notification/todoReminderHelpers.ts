import { internalMutation, internalAction } from "../_generated/server";
import { v } from "convex/values";


export const fetchTodoCounts = internalAction({
    args: { clerkId: v.string() },
    handler: async (ctx, { clerkId }) => {
        try {
            const response = await fetch(`https://4031-88-233-39-55.ngrok-free.app/api/notification/todoReminder?clerkId=${clerkId}`);
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
            await ctx.db.insert("notification", { clerkId, message, sent: false, type: "todoReminder", read: false });
            return message
        } catch (error) {
            throw new Error("Görev hatırlatıcı oluşturulurken bir hata çıktı " + error);
        }
    },
});


