"use client";

import React from "react";
import { Button } from "../ui/button";
import { useModal } from "@/providers/modal-provider";
import { UserButton } from "@clerk/nextjs";
import { useTheme } from "next-themes";
import { dark } from "@clerk/themes";
import { Bell, Fullscreen } from "lucide-react";

type Props = {
  title: string;
};

const PageHeader = ({ title }: Props) => {
  const { setOpen } = useModal();
  const { resolvedTheme } = useTheme();

  return (
    <div className="flex w-full items-center justify-between z-50 mb-6">
      <h1 className="text-2xl lg:text-3xl font-bold">{title}</h1>
      <div className="items-center border rounded-xl flex p-1 shadow-sm">
        <Button variant={"ghost"} size={"icon"}>
          <Fullscreen size={18} />
        </Button>
        <Button
          variant={"ghost"}
          size={"icon"}
          /* onClick={() => setOpen(<NotificationsModal />)} */
        >
          <Bell size={18} />
        </Button>
        <div className="h-5 flex items-center justify-center px-4 pr-3 border-l-2">
          <UserButton
            appearance={{
              baseTheme: resolvedTheme === "dark" ? dark : undefined,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default PageHeader;
