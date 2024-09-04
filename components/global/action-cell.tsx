import React from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Ellipsis } from 'lucide-react';

export interface Action {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  variant?: 'default' | 'destructive';
  alert?: boolean;
}

interface ActionCellProps<T> {
  item: T;
  actions: Action[] | ((item: T) => Action[]);
  label?: string;
  triggerIcon?: React.ReactNode;
  triggerButtonProps?: React.ComponentProps<typeof Button>;
}

export function ActionCell<T>({
  item,
  actions,
  label = 'Eylemler',
  triggerIcon = <Ellipsis size={16} />,
  triggerButtonProps = { variant: 'ghost', size: 'icon-sm' },
}: ActionCellProps<T>) {
  const actionsList = typeof actions === 'function' ? actions(item) : actions;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button {...triggerButtonProps}>{triggerIcon}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <DropdownMenuLabel>{label}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {actionsList.map((action: Action, index: number) => (
          <DropdownMenuItem
            key={index}
            onClick={action.onClick}
            className={
              action.variant === 'destructive' ? 'text-destructive' : ''
            }
          >
            {action.icon}
            <span>{action.label}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
