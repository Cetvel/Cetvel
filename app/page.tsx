import About from '@/components/sections/about';
import Contact from '@/components/sections/contact';
import Faq from '@/components/sections/faq';
import Features from '@/components/sections/features';
import Hero from '@/components/sections/hero';
import { Start } from '@/components/sections/start';
import React from 'react';

const page = async () => {
  return (
    <main>
      <Hero />
      <Features />
      <About />
      <Faq />
      <Start />
      <Contact />
      <footer className='py-4 text-center bg-secondary mt-10'>
        <span className='text-sm text-secondary-content'>
          2024 © Cetvel. All rights reserved.
        </span>
      </footer>
    </main>
  );
};

export default page;
