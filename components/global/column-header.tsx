'use client';

import { Column } from '@tanstack/react-table';
import { ChevronsUpDown, EyeOff, SortAsc, SortDesc } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface ColumnHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  title: string;
  sortable?: boolean;
  className?: string;
  hideable?: boolean;
}

export function ColumnHeader<TData, TValue>({
  column,
  title,
  className,
  sortable = false,
  hideable = false,
}: ColumnHeaderProps<TData, TValue>) {
  if (!column.getCanSort()) {
    return <div className={cn(className)}>{title}</div>;
  }

  if (sortable && hideable)
    return (
      <div className={cn('flex items-center space-x-2', className)}>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant='ghost'
              size='sm'
              className='-ml-3 h-8 data-[state=open]:bg-accent'
            >
              <span>{title}</span>
              {column.getIsSorted() === 'desc' && sortable ? (
                <SortDesc className='ml-2 h-4 w-4' />
              ) : column.getIsSorted() === 'asc' && sortable ? (
                <SortAsc className='ml-2 h-4 w-4' />
              ) : (
                sortable ||
                (hideable && <ChevronsUpDown className='ml-2 h-4 w-4' />)
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='start'>
            {sortable && (
              <>
                <DropdownMenuItem onClick={() => column.toggleSorting(false)}>
                  <SortAsc className='mr-2 h-3.5 w-3.5 text-muted-foreground/70' />
                  Artan
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => column.toggleSorting(true)}>
                  <SortDesc className='mr-2 h-3.5 w-3.5 text-muted-foreground/70' />
                  Azalan
                </DropdownMenuItem>
                <DropdownMenuSeparator />
              </>
            )}

            {hideable && (
              <DropdownMenuItem onClick={() => column.toggleVisibility(false)}>
                <EyeOff className='mr-2 h-3.5 w-3.5 text-muted-foreground/70' />
                Gizle
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );

  return <p>{title}</p>;
}
