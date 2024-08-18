"use client";

import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/ui/date-picker";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { tr } from "date-fns/locale";
import { Ellipsis, Pencil, Trash } from "lucide-react";

export const columns: ColumnDef<FocusItem>[] = [
  {
    accessorKey: "description",
    header: "Açıklama",
  },
  {
    accessorKey: "time",
    header: "Süre",
  },
  {
    accessorKey: "date",
    header: "Tarih",
    filterFn: (row, columnId, filterValue) => {
      const filter_from = filterValue.from;
      const filter_to = filterValue.to;

      const date = new Date(row.original.date);

      return date >= filter_from && date <= filter_to;
    },
    cell: ({ row }) => {
      return format(new Date(row.original.date), "LLL, d yyyy", { locale: tr });
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const item = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon-sm">
              <span className="sr-only">Menü</span>
              <Ellipsis />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Eylemler</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Pencil />
              Düzenle
            </DropdownMenuItem>
            <DropdownMenuItem className="text-red-500">
              <Trash />
              Sil
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
