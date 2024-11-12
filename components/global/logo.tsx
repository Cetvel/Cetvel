'use client';

import { useTheme } from 'next-themes';
import Image from 'next/image';
import React from 'react';

type Props = {
  size: number;
  type?: 'text' | 'icon';
};

const Logo = ({ size, type = 'text' }: Props) => {
  const { resolvedTheme } = useTheme();

  console.log(resolvedTheme);

  return (
    <Image
      src={`/image/logo_${resolvedTheme === 'light' ? 'light' : 'dark'}${type === 'text' && '_text'}.svg`}
      width={type === 'text' ? size * 4 : size}
      height={size}
      alt='Logo'
    />
  );
};

export default Logo;
