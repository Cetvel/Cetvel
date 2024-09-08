import { cronJobs } from "convex/server";
import { internal } from "./_generated/api";

const crons = cronJobs();


crons.interval(
  "run-notification-production",
  { minutes:  10},
  internal.notification.notificationProduction.produceNotifications,
)
export default crons

crons.interval(
  "delete-exprired-notifications",
  { minutes:  60},
  internal.notification.notification.deleteExpiredNotifications
)