import { TextGenerateEffect } from '@/components/global/text-generate-effect';
import Navigation from '../ui/navigation';
import { Button } from '../ui/button';
import { SignedIn, SignedOut, SignUpButton } from '@clerk/nextjs';
import { Sparkles } from 'lucide-react';
import Link from 'next/link';

const Hero: React.FC = () => {
  return (
    <section
      className={`h-screen relative flex md:items-center justify-center flex-col dark:bg-grid-white/[0.02] bg-grid-black/[0.02] overflow-hidden`}
    >
      <Navigation />
      <div className='flex flex-col gap-8 max-w-3xl md:items-center px-4 z-10 md:-mt-32 text-center relative'>
        <div className='bg-primary text-primary-foreground px-3 py-1.5 rounded-full absolute -top-8 text-sm md:text-base right-2 md:-top-2 md:-right-12 xl:-top-4 xl:-right-16 rotate-12 select-none'>
          Beta sürümü
        </div>
        <TextGenerateEffect
          words='Yapay zeka destekli,
          akıllı öğrenme asistanı.'
        />
        <p className='font-normal text-muted-foreground md:text-lg'>
          Yapay zeka destekli kişisel öğrenme asistanınız ile çalışmalarınızı
          optimize edin, ilerlemelerinizi takip edin ve akademik hedeflerinize
          ulaşın.
        </p>
        <SignedOut>
          <SignUpButton>
            <Button size='lg' className='w-max'>
              <Sparkles size={14} className='mr-1' />
              Hemen Başla
            </Button>
          </SignUpButton>
        </SignedOut>
        <SignedIn>
          <Link href='/dashboard'>
            <Button size='lg'>
              <Sparkles size={14} className='mr-1' />
              Hemen Başla
            </Button>
          </Link>
        </SignedIn>
      </div>

      <div className='w-[50rem] h-[50rem] rounded-full bg-gradient-radial from-primary/30 to-secondary blur-3xl absolute -bottom-96' />
    </section>
  );
};

export default Hero;
