"use client";

import TaskForm from "@/components/forms/task-form";
import Modal from "@/components/global/modal";
import { Button } from "@/components/ui/button";
import { useModal } from "@/providers/modal-provider";
import React from "react";
import { IoChevronForward } from "react-icons/io5";

type Props = {
  task: Task;
};

const RecommendedTask = ({ task }: Props) => {
  const { setOpen } = useModal();

  return (
    <Button
      variant="outline"
      className="justify-between"
      onClick={() =>
        setOpen(
          <Modal title="Görev oluştur">
            <TaskForm task={task} />
          </Modal>
        )
      }
    >
      <h5 className="font-medium">{task.title}</h5>

      <IoChevronForward className="w-4 h-4 text-secondary-content" />
    </Button>
  );
};

export default RecommendedTask;
