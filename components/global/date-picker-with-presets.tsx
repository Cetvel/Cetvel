"use client";

import * as React from "react";
import { addDays, format } from "date-fns";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CalendarCog } from "lucide-react";

type DatePickerWithPresetsProps = {
  value: Date;
  onDateChange: (date: Date | undefined) => void;
};

export function DatePickerWithPresets({
  value,
  onDateChange,
}: DatePickerWithPresetsProps) {
  const [date, setDate] = React.useState<Date>(value);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarCog className="mr-2 h-4 w-4" />
          {date ? format(date, "dd-MM-yyyy") : <span>Bir tarih seçin</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="flex w-auto flex-col space-y-2 p-2">
        <Select
          onValueChange={(value) =>
            setDate(addDays(new Date(), parseInt(value)))
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Seçiniz" />
          </SelectTrigger>
          <SelectContent position="popper">
            <SelectItem value="0">Bugün</SelectItem>
            <SelectItem value="1">Yarın</SelectItem>
            <SelectItem value="3">3 gün sonra</SelectItem>
            <SelectItem value="7">1 hafta sonra</SelectItem>
          </SelectContent>
        </Select>
        <div className="rounded-xl border-card">
          <Calendar
            mode="single"
            selected={date}
            onSelect={(date) => {
              setDate(date!);
              onDateChange(date);
            }}
          />
        </div>
      </PopoverContent>
    </Popover>
  );
}
