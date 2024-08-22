import { todo } from "node:test";
import { internalMutation, internalAction} from "./_generated/server";
import { v } from "convex/values";


export const fetchTodoCounts = internalAction({
    args: { userId: v.string() },
    handler: async (ctx, { userId }) => {
        const response = await fetch(`https://99ae-88-233-39-55.ngrok-free.app/api/notification/todoReminder?userId=${userId}`);
        if (!response.ok) {
            const errorText = await response.text();
            console.error("API Error response:", errorText);
            throw new Error(`API request failed with status ${response.status}: ${errorText}`);
        }
        const data = await response.json();
        return data.count
    }
})


export const createTodoReminder = internalMutation({
    args: { userId: v.string(), todoCounts: v.number() },
    handler: async (ctx, { userId, todoCounts }) => {
        let message
        if (todoCounts > 0) {
            message = `Bugün bitirilmesi gereken ${todoCounts} göreviniz var.`
        } else{
            message = "Bugün yapılacak göreviniz yok. Oluşturmak ister misiniz?"
        }

        await ctx.db.insert( "notification", { userId, message, sent: false , type : "todoReminder" , read : false});
        return message
    },
}); 


