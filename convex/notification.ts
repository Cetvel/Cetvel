import { action, internalAction } from './_generated/server';

import { v } from 'convex/values';
import { internal } from './_generated/api';

export const checkAndSendNotifications = action({
  args: { userId: v.string() },
  handler: async (ctx, { userId }) => {
    console.log("Bu action çalışıyor, kafa relax olsun.");
    try {
      //
      console.log("Sending notification to user on Actions:", userId);
      const response = await fetch(`https://bfd1-78-191-178-225.ngrok-free.app/api/notification?userId=${userId}`);
      console.log("Response status:", response.status);
      console.log("Response headers:", response.headers);
      if (!response.ok) {
        const errorText = await response.text();
        console.error("API Error response:", errorText); // Debug log
        throw new Error(`API request failed with status ${response.status}: ${errorText}`);
      }

      const todoCounts = await response.json()
      console.log("todocounts" , todoCounts);
      if (todoCounts.count > 0) {
        const count = todoCounts.count;
        const message = `Bugün bitirilmesi gereken ${count} göreviniz var.`;
        await ctx.runMutation(internal.todoReminder.createTodoReminderNoti , { userId, message });
        return { success: true, message };
      } else {
        return { success: true, message: "Bildirim gönderilecek görev bulunamadı." };
      }
    } catch (error) {
      console.error("Hata oluştu:", error);
      return { success: false, message: "Bir hata oluştu YINE VE YENIDEN." };
    }
  },
});