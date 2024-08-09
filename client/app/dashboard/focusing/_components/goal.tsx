import { Progress } from "@/components/ui/progress";
import React from "react";

type GoalProps = {
  goal: string;
  progress: number;
  max: number;
};

const Goal = ({ goal, progress, max }: GoalProps) => {
  return (
    <div className="flex w-full flex-col gap-2">
      <div className="flex items-center justify-between w-full">
        <p>{goal}</p>
        <p className="text-secondary-content">
          {progress}/{max}
        </p>
      </div>
      <Progress value={(progress / max) * 100} />
    </div>
  );
};

export default Goal;
