// components/ActionCell.tsx
import React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Ellipsis } from "lucide-react";
import { useTaskActions } from "@/hooks/use-task-actions";

interface ActionCellProps {
  task: Task;
  label?: string;
}

export const ActionCell: React.FC<ActionCellProps> = ({
  task,
  label = "Eylemler",
}) => {
  const actions = useTaskActions(task);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon-sm">
          <Ellipsis size={16} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>{label}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {actions.map((action: Action, index: number) => (
          <DropdownMenuItem
            key={index}
            onClick={action.onClick}
            className={
              action.variant === "destructive" ? "text-destructive" : ""
            }
          >
            {action.icon}
            {action.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
