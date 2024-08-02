"use client";

import { menuLinks } from "@/constants";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { IoMenuOutline } from "react-icons/io5";

const logo = "/image/logo.svg";

const Sidebar = () => {
  const pathname = usePathname();
  const splitPath = pathname.split("/");
  const path = splitPath.slice(0, 3).join("/");

  return (
    <>
      <aside className="bg-white dark:bg-dark-500 border-r border-neutral-200 dark:border-neutral-500 fixed w-64 p-6 hidden h-[500rem] xl:flex flex-col gap-6">
        <div className="flex gap-3 items-center">
          <Image src={logo} alt="Vektör" width={32} height={32} />
          <h2 className="text-2xl font-semibold text-accent-content select-none">
            Cetvel
          </h2>
        </div>

        {/* Menu */}
        <nav className="flex flex-col gap-2">
          {menuLinks.map(
            (
              link: {
                label: string;
                href: string;
                icon: JSX.Element;
              },
              index: number
            ) => (
              <Link
                key={index}
                href={link.href}
                className={cn(
                  "flex items-center rounded-xl px-4 gap-[0.65rem] md:w-[290px] py-2.5 text-secondary-content hover:text-accent-content",
                  {
                    "!text-white bg-primary-500": path === link.href,
                  }
                )}
              >
                {link.icon}
                <span>{link.label}</span>
              </Link>
            )
          )}
        </nav>
      </aside>

      {/* Mobile Nav */}
      <aside className="fixed xl:hidden drawer z-[100] top-0 left-0 right-0 flex items-center justify-between px-2 py-2 bg-accent bg-opacity-80 backdrop-blur-2xl">
        <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          <label
            htmlFor="my-drawer-3"
            className="drawer-button btn btn-ghost btn-square"
          >
            <IoMenuOutline className="w-8 h-8" />
          </label>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-3"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <nav className="flex menu w-80 p-6 min-h-full flex-col gap-3 bg-base-100">
            <div className="flex gap-2 items-center mb-8">
              <Image src={logo} alt="Vektör" width={26} height={26} />
              <h2 className="text-xl font-semibold text-accent-content">
                Cetvel
              </h2>
            </div>
            {menuLinks.map(
              (
                link: {
                  label: string;
                  href: string;
                  icon: JSX.Element;
                },
                index: number
              ) => (
                <Link
                  key={index}
                  href={link.href}
                  className={cn(
                    "flex items-center gap-2 py-2 text-secondary-content text-lg hover:text-accent-content",
                    {
                      "!text-base-content": path === link.href,
                    }
                  )}
                >
                  {link.icon}
                  <span className="mt-0.5">{link.label}</span>
                </Link>
              )
            )}
          </nav>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
