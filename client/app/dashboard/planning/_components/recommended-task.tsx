import { Button } from "@/components/ui/button";
import React from "react";
import { IoChevronForward } from "react-icons/io5";

type Props = {
  task: Task;
};

const RecommendedTask = ({ task }: Props) => {
  return (
    <Button variant="outline" className="justify-between">
      <h5 className="font-medium">{task.title}</h5>

      <IoChevronForward className="w-4 h-4 text-secondary-content" />
    </Button>
  );
};

export default RecommendedTask;
