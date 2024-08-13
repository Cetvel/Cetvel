"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { IoCheckmark, IoChevronDown } from "react-icons/io5";
import { useMediaQuery } from "usehooks-ts";
import { Drawer, DrawerContent, DrawerTrigger } from "./drawer";

type ComboboxProps = {
  itemValue: string;
  onChange: (value: string) => void;
  items: { id: string; value: string }[];
  searchText?: string;
  emptyText?: string;
  selectText?: string;
  searchable?: boolean;
  className?: string;
};

export function Combobox({
  itemValue,
  onChange,
  items,
  emptyText,
  searchText,
  selectText,
  searchable,
  className,
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size={"sm"}
            role="combobox"
            aria-expanded={open}
            className={cn("w-[120px] justify-between", className)}
          >
            {value
              ? items.find((item) => item.value === value)?.value
              : selectText
              ? selectText
              : "Seçiniz..."}
            <IoChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-max p-0">
          <Command>
            {searchable && (
              <CommandInput placeholder={searchText ? searchText : "Ara..."} />
            )}
            <CommandList>
              <CommandEmpty>
                {emptyText ? emptyText : "Sonuç bulunamadı."}
              </CommandEmpty>
              <CommandGroup>
                {items.map((item) => (
                  <CommandItem
                    key={item.value}
                    value={item.value}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? "" : currentValue);
                      setOpen(false);
                      onChange(currentValue === value ? "" : currentValue);
                    }}
                  >
                    <IoCheckmark
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === item.value ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {item.value}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button
          variant="outline"
          size={"sm"}
          role="combobox"
          aria-expanded={open}
          className="w-[120px] justify-between"
        >
          {value
            ? items.find((item) => item.value === value)?.label
            : selectText
            ? selectText
            : "Seçiniz..."}
          <IoChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <Command>
          <CommandInput placeholder={searchText ? searchText : "Ara..."} />
          <CommandList>
            <CommandEmpty>
              {emptyText ? emptyText : "Sonuç bulunamadı."}
            </CommandEmpty>
            <CommandGroup>
              {items.map((item) => (
                <CommandItem
                  key={item.value}
                  value={item.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                    onChange(currentValue === value ? "" : currentValue);
                  }}
                >
                  <IoCheckmark
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === item.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {item.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </DrawerContent>
    </Drawer>
  );
}
