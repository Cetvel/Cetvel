'use client';

import { ActionCell } from '@/components/global/action-cell';
import { Button } from '@/components/ui/button';
import { GetFocusActions } from '@/hooks/use-focus-actions';
import { convertSecondsToTime } from '@/lib/utils';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';

export const columns: ColumnDef<Focus>[] = [
  {
    accessorKey: 'title',
    header: 'Başlık',
  },
  {
    accessorKey: 'duration',
    header: 'Süre',
    cell: ({ row }) => {
      const seconds = row.original.duration;

      return convertSecondsToTime(seconds);
    },
  },
  {
    accessorKey: 'startsAt',
    filterFn: (row, columnId, filterValue) => {
      const filter_from = filterValue.from;
      const filter_to = filterValue.to;

      const date = new Date(row.original.startsAt);

      return date >= filter_from && date <= filter_to;
    },
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          className='px-0'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Tarih
          <ArrowUpDown size={14} />
        </Button>
      );
    },
    cell: ({ row }) => {
      return new Date(row.original.startsAt).toLocaleDateString();
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const actions = GetFocusActions(row.original);

      return (
        <ActionCell
          item={row.original}
          actions={actions}
          label='Odaklanma eylemleri'
        />
      );
    },
  },
];
