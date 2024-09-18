import React from 'react';
import { cn } from '@/lib/utils';

type RadialGlowProps = {
  glowColor?: string;
  glowOpacity?: string;
  glowSize?: string;
  className?: string;
  children?: React.ReactNode;
};

const RadialGlow = ({
  children,
  className,
  glowColor = 'hsl(var(--primary))',
  glowOpacity = '0.15',
  glowSize = '80%',
  ...props
}: RadialGlowProps) => {
  return (
    <div className={cn('relative overflow-hidden', className)} {...props}>
      <div
        className='absolute inset-0 z-0'
        style={{
          background: `radial-gradient(circle, ${glowColor} 0%, rgba(255,255,255,0) 70%)`,
          opacity: glowOpacity,
          width: glowSize,
          height: glowSize,
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      />
      <div className='relative z-10'>{children}</div>
    </div>
  );
};

export default RadialGlow;
