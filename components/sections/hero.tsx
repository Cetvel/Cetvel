import React from 'react';
import { TextGenerateEffect } from '@/components/global/text-generate-effect';
import Navigation from '../ui/navigation';
import Link from 'next/link';
import { Button } from '../ui/button';
import { SignUpButton } from '@clerk/nextjs';

const Hero: React.FC = () => {
  return (
    <section
      className={`py-32 md:h-screen bg-dark-200 relative flex md:items-center justify-center flex-col md:py-4 bg-grid-white/[0.02]`}
    >
      <Navigation />
      <div className='flex flex-col gap-8 max-w-3xl md:items-center px-4 z-10 md:-mt-52 text-center'>
        <TextGenerateEffect
          words='Yapay zeka destekli,
          akıllı öğrenme asistanı.'
        />
        <p className='font-normal text-muted-foreground md:text-lg'>
          Yapay zeka destekli kişisel öğrenme asistanınız ile çalışmalarınızı
          optimize edin, ilerlemelerinizi takip edin ve akademik hedeflerinize
          ulaşın.
        </p>
        <SignUpButton>
          <Button size='lg'>Hemen Başla</Button>
        </SignUpButton>
      </div>
    </section>
  );
};

export default Hero;
