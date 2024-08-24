import { ActionCell } from "@/components/global/action-cell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

export const columns: ColumnDef<Task>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Tümünü seç"
      />
    ),

    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Satırı seç"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "title",
    header: "Başlık",
  },
  {
    accessorKey: "tag",
    header: "Etiket",
  },
  {
    accessorKey: "status",
    header: "Durum",
    cell: ({ row }) => {
      const value = row.original.status;

      return (
        <Badge variant={value === "completed" ? "default" : "destructive"}>
          {
            {
              completed: "Tamamlandı",
              incomplete: "Tamamlanmadı",
            }[value]
          }
        </Badge>
      );
    },
  },
  {
    accessorKey: "startsAt",
    cell: ({ row }) => {
      const value = row.original.startsAt;

      return new Date(value).toLocaleDateString();
    },
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="px-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Başlangıç
          <ArrowUpDown className="h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "endsAt",
    cell: ({ row }) => {
      const value = row.original.endsAt;

      return new Date(value).toLocaleDateString();
    },
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="px-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Bitiş
          <ArrowUpDown className="h-4 w-4" />
        </Button>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <ActionCell task={row.original} />,
  },
];
