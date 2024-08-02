"use client";

import React from "react";
import { IoPlay } from "react-icons/io5";
import { useModal } from "@/providers/modal-provider";
import { Button } from "@/components/ui/button";
import Modal from "@/components/global/modal";
import TimerForm from "@/components/forms/timer-form";

const tags = [
  { id: "1", value: "is", label: "İş" },
  { id: "2", value: "okul", label: "Okul" },
  { id: "3", value: "kisisel", label: "Kişisel" },
];

const Timer = () => {
  const { setOpen } = useModal();

  return (
    <>
      <div
        className="relative rounded-xl lg:col-span-2 shadow-sm p-6 h-[300px] flex flex-col md:h-full justify-between items-stretch"
        style={{
          backgroundImage:
            "url(https://images.wallpaperscraft.com/image/single/house_art_dark_136825_3840x3072.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundBlendMode: "multiply",
          backgroundColor: "rgba(0,0,0,0.2)",
        }}
      >
        <div className="flex flex-col grow items-center justify-center">
          <div className="flex mb-4 items-center">
            <h2 className="text-2xl font-bold text-white">Zamanlayıcı</h2>
          </div>
          <Button
            onClick={() => {
              setOpen(
                <Modal title="">
                  <TimerForm />
                </Modal>
              );
            }}
            size={"sm"}
          >
            <IoPlay className="mr-1 w-3 h-3" />
            Başlat
          </Button>
        </div>
      </div>
    </>
  );
};

export default Timer;
