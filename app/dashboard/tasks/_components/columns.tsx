import { ActionCell } from "@/components/global/action-cell";
import { Badge } from "@/components/ui/badge";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<Task>[] = [
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
    header: "Başlangıç",
    cell: ({ row }) => {
      const value = row.original.startsAt;

      return new Date(value).toLocaleDateString();
    },
  },
  {
    accessorKey: "endsAt",
    header: "Bitiş",
    cell: ({ row }) => {
      const value = row.original.endsAt;

      return new Date(value).toLocaleDateString();
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <ActionCell task={row.original} />,
  },
];
