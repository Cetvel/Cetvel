"use client";

import React from "react";
import { IoAdd } from "react-icons/io5";
import Modal from "./modal";
import { useModal } from "@/providers/modal-provider";
import { Button } from "../ui/button";
import TaskForm from "../forms/task-form";

const AddTask = () => {
  const { setOpen } = useModal();

  return (
    <>
      <Button
        onClick={() =>
          setOpen(
            <Modal title="Görev oluştur">
              <TaskForm />
            </Modal>
          )
        }
        size={"sm"}
      >
        <IoAdd className="mr-2" size={16} />
        Oluştur
      </Button>
    </>
  );
};

export default AddTask;
