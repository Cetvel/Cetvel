'use client';

import React from 'react';
import { TextGenerateEffect } from '@/components/global/text-generate-effect';
import Navigation from '../ui/navigation';
import { Button } from '../ui/button';
import { SignUpButton } from '@clerk/nextjs';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { Sparkles } from 'lucide-react';

const Hero: React.FC = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, { stiffness: 300, damping: 30 });
  const smoothY = useSpring(mouseY, { stiffness: 300, damping: 30 });

  const handleMouseMove = (event: React.MouseEvent) => {
    const { clientX, clientY } = event;
    mouseX.set(clientX);
    mouseY.set(clientY);
  };

  return (
    <section
      className={`py-32 md:h-screen relative flex md:items-center justify-center flex-col md:py-4 dark:bg-grid-white/[0.02] bg-grid-black/[0.02] overflow-hidden`}
      onMouseMove={handleMouseMove}
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
          <Button size='lg'>
            <Sparkles size={14} className='mr-1' />
            Hemen Başla
          </Button>
        </SignUpButton>
      </div>

      <motion.div
        className='absolute w-8 h-8 rounded-full bg-primary/20'
        style={{
          x: smoothX,
          y: smoothY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />
      <motion.div
        className='absolute w-4 h-4 rounded-full bg-secondary/20'
        style={{
          x: smoothX,
          y: smoothY,
          translateX: '-100%',
          translateY: '-100%',
        }}
      />
      <motion.div
        className='absolute w-6 h-6 rounded-full bg-accent/20'
        style={{
          x: smoothX,
          y: smoothY,
          translateX: '50%',
          translateY: '50%',
        }}
      />
    </section>
  );
};

export default Hero;
