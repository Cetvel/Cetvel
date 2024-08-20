import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const TasksLoader = () => {
  return (
    <>
      <Skeleton className="h-12 w-full rounded-xl" />
      <Skeleton className="h-12 w-full rounded-xl" />
      <Skeleton className="h-12 w-full rounded-xl" />
      <Skeleton className="h-12 w-full rounded-xl" />
    </>
  );
};

export default TasksLoader;
