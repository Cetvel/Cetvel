import Image from 'next/image';
import React from 'react';

type Props = {
  size: number;
};

const Logo = ({ size }: Props) => {
  return (
    <Image src='/image/logo.svg' width={size} height={size} alt='Cetvel' />
  );
};

export default Logo;
