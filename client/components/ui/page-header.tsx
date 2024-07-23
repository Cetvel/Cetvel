"use client";

import Link from "next/link";
import React from "react";
import {
  IoNotificationsOutline,
  IoScanOutline,
  IoSettingsOutline,
} from "react-icons/io5";
import { Button } from "../ui/button";
import { useModal } from "@/providers/modal-provider";

type Props = {
  title: string;
};

const PageHeader = ({ title }: Props) => {
  const { setOpen } = useModal();

  return (
    <div className="flex w-full items-center justify-between z-50 mb-6">
      <h1 className="text-2xl lg:text-3xl font-bold">{title}</h1>
      <div className="bg-white dark:bg-dark-500 border border-neutral-200 dark:border-neutral-500 rounded-xl flex p-1 shadow-sm">
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
        <div className="dropdown dropdown-end">
          <Button tabIndex={0} role="button" variant={"ghost"} size={"icon"}>
            <IoSettingsOutline size={18} />
          </Button>
          <ul
            tabIndex={0}
            className="p-2 shadow menu dropdown-content bg-base-100 rounded-xl w-36"
          >
            <li>
              <Link href="/dashboard/settings">Hesap</Link>
            </li>
            <li>
              <Link href="/dashboard/settings/preferences">Tercihler</Link>
            </li>
            <li>
              <Link href="/dashboard/settings/billing">Abonelik</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PageHeader;
