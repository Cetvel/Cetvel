"use client";

import { menuLinks } from "@/constants";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { Menu } from "lucide-react";

const logo = "/image/logo.svg";

const Sidebar = () => {
  const pathname = usePathname();
  const splitPath = pathname.split("/");
  const path = splitPath.slice(0, 3).join("/");

  return (
    <>
      <aside className="bg-accent border-r fixed w-64 p-6 hidden h-[500rem] xl:flex flex-col gap-6">
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
                  "flex items-center rounded-xl px-4 gap-[0.65rem] md:w-[290px] py-2.5",
                  {
                    "!text-white bg-primary": path === link.href,
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
      <aside className="z-50 xl:hidden w-full flex items-center justify-between px-2 py-2 bg-card bg-opacity-80 backdrop-blur-2xl">
        <h2 className="text-2xl font-semibold text-accent-content select-none">
          Cetvel
        </h2>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <Menu size={24} />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <h2 className="text-2xl font-semibold select-none">Cetvel</h2>
            </SheetHeader>

            <nav className="flex flex-col gap-2 mt-10">
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
                        "!text-white bg-primary": path === link.href,
                      }
                    )}
                  >
                    {link.icon}
                    <span>{link.label}</span>
                  </Link>
                )
              )}
            </nav>
          </SheetContent>
        </Sheet>
      </aside>
    </>
  );
};

export default Sidebar;
