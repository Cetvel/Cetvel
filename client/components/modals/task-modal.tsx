import React, { useState } from "react";
import { IoCheckmarkDone, IoNotificationsOutline } from "react-icons/io5";
import { Button } from "../ui/button";
import { useForm, SubmitHandler } from "react-hook-form";
import Modal from "../global/modal";

type IFormInputs = {
  title: string;
  description: string;
  reminder: string;
  list: string;
};

type Props = {
  task: any;
};

const TaskModal = ({ task }: Props) => {
  return (
    <Modal
      title={task.title}
      buttons={
        <Button variant={task.completed ? "default" : "link"} size={"sm"}>
          {task.completed && <IoCheckmarkDone />}
          Tamamlandı
        </Button>
      }
    >
      <form className="flex gap-4">
        {/* TODO: Reminder and tag select component */}
      </form>
    </Modal>
  );
};

export default TaskModal;
