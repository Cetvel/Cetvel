import React from "react";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import BgBlob from "@/components/ui/bg-blobs";
import Navigation from "../ui/navigation";
import Link from "next/link";
import { Button } from "../ui/button";

const Hero: React.FC = () => {
  return (
    <section
      className={`py-32 md:h-screen bg-dark-200 relative flex md:items-center justify-center flex-col md:py-4 bg-grid-white/[0.02]`}
    >
      <BgBlob />
      <Navigation />
      <div className="flex flex-col gap-8 max-w-3xl md:items-center px-4 z-10 md:-mt-52 text-center">
        <TextGenerateEffect
          words="Yapay zeka ile destekli,
          Kişisel planlama ve analiz platformu."
        />
        <p className="font-normal text-dark-600 dark:text-light-600 md:text-xl">
          Edutrack, kişisel ve iş planlarınızı yapay zeka ile destekli olarak
          oluşturmanıza ve analiz etmenize olanak sağlar. Hedeflerinizi
          belirleyin, planlarınızı oluşturun ve analizlerinizi yapın.
        </p>
        <Link href={"/register"}>
          <Button size={"lg"}>Hemen Başla</Button>
        </Link>
      </div>
    </section>
  );
};

export default Hero;
