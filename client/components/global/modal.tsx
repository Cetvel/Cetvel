"use client";
import { useModal } from "@/providers/modal-provider";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "../ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";

type Props = {
  title: string;
  subheading?: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
};

const Modal = ({ children, defaultOpen, subheading, title }: Props) => {
  const { isOpen, setClose } = useModal();
  return (
    <Dialog open={isOpen || defaultOpen} onOpenChange={setClose}>
      <DialogContent className="overflow-y-auto md:max-h-[1000px] md:h-fit h-screen shad-dialog">
        <DialogHeader className="text-left">
          <DialogTitle className="text-lg font-bold">{title}</DialogTitle>
          <DialogDescription>{subheading}</DialogDescription>
          {children}
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
