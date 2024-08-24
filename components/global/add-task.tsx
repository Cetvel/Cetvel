"use client";

import React from "react";
import Modal from "./modal";
import { useModal } from "@/providers/modal-provider";
import { Button } from "../ui/button";
import TaskForm from "../forms/task-form";
import { Plus } from "lucide-react";

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
        <Plus size={16} />
        Oluştur
      </Button>
    </>
  );
};

export default AddTask;
