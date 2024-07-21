import Faq from "@/components/sections/faq";
import Features from "@/components/sections/features";
import Hero from "@/components/sections/hero";
import { Start } from "@/components/sections/start";
import React from "react";

const page = async () => {
  return (
    <main className="dark">
      <Hero />
      <Features />
      <Faq />
      <Start />
      <footer className="py-4 text-center bg-dark-300">
        <span className="text-sm text-secondary-content">
          2024 © Muhammed. All rights reserved.
        </span>
      </footer>
    </main>
  );
};

export default page;
