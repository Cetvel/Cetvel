import { ActionCell } from '@/components/global/action-cell';
import { ColumnHeader } from '@/components/global/column-header';
import { Badge } from '@/components/ui/badge';
import { GetTaskActions } from '@/hooks/use-task-actions';
import { ColumnDef } from '@tanstack/react-table';

export const columns: ColumnDef<Task>[] = [
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
              incomplete: 'Tamamlanmadı',
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
    cell: ({ row }) => {
      const actions = GetTaskActions(row.original);
      return (
        <ActionCell
          item={row.original}
          actions={actions}
          label='Görev eylemleri'
        />
      );
    },
  },
];
