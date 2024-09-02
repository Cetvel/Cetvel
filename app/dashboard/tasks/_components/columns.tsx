import { ActionCell } from '@/components/global/action-cell';
import { ColumnHeader } from '@/components/global/column-header';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';

export const columns: ColumnDef<Task>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Tümünü seç'
      />
    ),

    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label='Satırı seç'
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'title',
    header: 'Başlık',
  },
  {
    accessorKey: 'tag',
    header: 'Etiket',
  },
  {
    accessorKey: 'status',
    header: 'Durum',
    cell: ({ row }) => {
      const value = row.original.status;

      return (
        <Badge variant={value === 'completed' ? 'default' : 'destructive'}>
          {
            {
              completed: 'Tamamlandı',
              incomplete: 'Aktif',
            }[value]
          }
        </Badge>
      );
    },
  },
  {
    accessorKey: 'startsAt',
    cell: ({ row }) => {
      const value = row.original.startsAt;

      return new Date(value).toLocaleDateString();
    },
    header: ({ column }) => {
      return <ColumnHeader column={column} title='Başlangıç' sortable />;
    },
    filterFn: (row, columnId, filterValue) => {
      const filter_from = filterValue.from;
      const filter_to = filterValue.to;

      const date = new Date(row.original.startsAt);

      return date >= filter_from && date <= filter_to;
    },
    sortingFn: 'datetime',
  },
  {
    accessorKey: 'endsAt',
    cell: ({ row }) => {
      const value = row.original.endsAt;

      return new Date(value).toLocaleDateString();
    },
    header: ({ column }) => {
      return <ColumnHeader column={column} title='Bitiş' sortable hideable />;
    },
    sortingFn: 'datetime',
  },
  {
    id: 'actions',
    cell: ({ row }) => <ActionCell task={row.original} />,
  },
];
