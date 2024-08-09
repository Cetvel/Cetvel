"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { IoEllipsisHorizontal, IoPencil, IoTrashBin } from "react-icons/io5";
import { format } from "date-fns";

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
    cell: ({ row }) => {
      const item = row.original;

      return format(item.date, "dd-MM-yyyy");
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
              <IoEllipsisHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Eylemler</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <IoPencil />
              Düzenle
            </DropdownMenuItem>
            <DropdownMenuItem className="text-red-500">
              <IoTrashBin />
              Sil
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
