"use client";

import * as React from "react";
import { format } from "date-fns";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { IoCalendar } from "react-icons/io5";
import { SelectSingleEventHandler } from "react-day-picker";

import { tr } from "date-fns/locale";

type DatePickerProps = {
  selected?: Date;
  onSelect?: SelectSingleEventHandler;
};

export function DatePicker({ selected, onSelect }: DatePickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal",
            !selected && "text-secondary-content"
          )}
        >
          <IoCalendar className="mr-2 h-4 w-4" />
          {selected ? (
            format(selected, "PPP", {
              locale: tr,
            })
          ) : (
            <span>Tarih seç</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={selected}
          onSelect={onSelect}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
