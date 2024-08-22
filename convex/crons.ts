import { cronJobs } from "convex/server";
import { internal } from "./_generated/api";

const crons = cronJobs();


crons.interval(
  "run-notification-production",
  { minutes:  1},
  internal.notificationProduction.produceNotifications,
)
export default crons