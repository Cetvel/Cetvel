import { TextGenerateEffect } from '@/components/global/text-generate-effect';
import Navigation from '../ui/navigation';
import { Button } from '../ui/button';
import { SignedIn, SignedOut, SignUpButton } from '@clerk/nextjs';
import { Sparkles } from 'lucide-react';
import Link from 'next/link';

const Hero: React.FC = () => {
  return (
    <section
      className={`py-32 md:h-screen relative flex md:items-center justify-center flex-col md:py-4 dark:bg-grid-white/[0.02] bg-grid-black/[0.02] overflow-hidden`}
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
        <SignedOut>
          <SignUpButton>
            <Button size='lg'>
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
    </section>
  );
};

export default Hero;
