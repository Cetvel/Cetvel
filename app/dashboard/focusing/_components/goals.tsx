"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import React from "react";
import Goal from "./goal";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useModal } from "@/providers/modal-provider";
import GoalForm from "@/components/forms/goal-form";
import Modal from "@/components/global/modal";
import { Disc } from "lucide-react";

const Goals = () => {
  const { setOpen } = useModal();

  return (
    <Card>
      <CardHeader>
        <h3 className="flex items-center gap-3 header-3">
          <span className="text-primary">
            <Disc size={30} />
          </span>
          Hedefler
        </h3>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px]">
          <div className="flex flex-col space-y-4">
            <Goal goal="Kodlama" progress={3} max={5} />
            <Goal goal="Ders Çalışma" progress={2} max={5} />
            <Goal goal="Kitap Okuma" progress={1} max={5} />
            <Goal goal="Kodlama" progress={3} max={5} />
            <Goal goal="Ders Çalışma" progress={2} max={5} />
            <Goal goal="Kitap Okuma" progress={1} max={5} />
            <Goal goal="Kodlama" progress={3} max={5} />
            <Goal goal="Ders Çalışma" progress={2} max={5} />
            <Goal goal="Kitap Okuma" progress={1} max={5} />
          </div>
        </ScrollArea>
      </CardContent>
      <CardFooter className="justify-self-end flex flex-col items-stretch">
        <Button
          variant={"secondary"}
          onClick={() =>
            setOpen(
              <Modal title="Hedef ekle">
                <GoalForm />
              </Modal>
            )
          }
        >
          Yeni hedef ekle
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Goals;
