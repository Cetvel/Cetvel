'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { deletePomodoro } from '@/lib/services/pomodoro-service';
import { formatMinutesToHours } from '@/lib/utils';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, Ellipsis, Trash } from 'lucide-react';

export const columns: ColumnDef<Focus>[] = [
  {
    accessorKey: 'title',
    header: 'Başlık',
  },
  {
    accessorKey: 'duration',
    header: 'Süre',
    cell: ({ row }) => {
      const minutes = row.original.duration;

      return formatMinutesToHours(minutes);
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
      const item = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' size='icon-sm'>
              <span className='sr-only'>Menü</span>
              <Ellipsis size={14} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuLabel>Eylemler</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className='text-red-500'
              onClick={() => {
                deletePomodoro(item._id);
              }}
            >
              <Trash size={14} />
              Sil
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
