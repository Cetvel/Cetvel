import { cronJobs } from "convex/server";
import { internal } from "./_generated/api";

const crons = cronJobs();


crons.interval(
  "run-notification-production",
  { minutes:  10},
  internal.notificationProduction.produceNotifications,
)
export default crons