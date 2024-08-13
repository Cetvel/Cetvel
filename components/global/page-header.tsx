"use client";

import Link from "next/link";
import React from "react";
import { IoNotificationsOutline, IoScanOutline } from "react-icons/io5";
import { Button } from "../ui/button";
import { useModal } from "@/providers/modal-provider";
import { UserButton } from "@clerk/nextjs";
import { useTheme } from "next-themes";
import { dark } from "@clerk/themes";

type Props = {
  title: string;
};

const PageHeader = ({ title }: Props) => {
  const { setOpen } = useModal();
  const { resolvedTheme } = useTheme();

  return (
    <div className="flex w-full items-center justify-between z-50 mb-6">
      <h1 className="text-2xl lg:text-3xl font-bold">{title}</h1>
      <div className="bg-white items-center dark:bg-dark-500 border border-neutral-200 dark:border-neutral-500 rounded-xl flex p-1 shadow-sm">
        <Button variant={"ghost"} size={"icon"}>
          <IoScanOutline size={18} />
        </Button>
        <Button
          variant={"ghost"}
          size={"icon"}
          /* onClick={() => setOpen(<NotificationsModal />)} */
        >
          <IoNotificationsOutline size={18} />
        </Button>
        <div className="h-5 flex items-center justify-center px-4 pr-3 !border-l-2 border-neutral-200 dark:border-neutral-500">
          <UserButton
            appearance={{
              baseTheme: resolvedTheme === "dark" ? dark : undefined,
            }}
            showName
          />
        </div>
      </div>
    </div>
  );
};

export default PageHeader;
