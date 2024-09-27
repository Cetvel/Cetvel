import React from 'react';
import {
  Tooltip as ShadcnTooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

interface CustomTooltipProps {
  content: React.ReactNode;
  side?: 'top' | 'right' | 'bottom' | 'left';
  align?: 'start' | 'center' | 'end';
  children: React.ReactNode;
  className?: string;
  contentClassName?: string;
}

export const CustomTooltip: React.FC<CustomTooltipProps> = ({
  content,
  side = 'top',
  align = 'center',
  children,
  className,
  contentClassName,
}) => {
  return (
    <TooltipProvider>
      <ShadcnTooltip delayDuration={300}>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent
          side={side}
          align={align}
          className={cn('bg-popover text-popover-foreground', contentClassName)}
        >
          {content}
        </TooltipContent>
      </ShadcnTooltip>
    </TooltipProvider>
  );
};
