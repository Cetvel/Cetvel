"use client";

import { useModal } from "@/providers/modal-provider";
import React from "react";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import Modal from "./modal";
import PomodoroForm from "../forms/pomodoro-form";

const AddPomodoro = () => {
  const { setOpen } = useModal();

  return (
    <Button
      onClick={() =>
        setOpen(
          <Modal title="Pomodoro ekle">
            <PomodoroForm />
          </Modal>
        )
      }
    >
      <Plus size={18} />
      Ekle
    </Button>
  );
};

export default AddPomodoro;
