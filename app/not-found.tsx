import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";
import Link from "next/link";
import { IoArrowBack } from "react-icons/io5";

const NotFound = () => {
  return (
    <main className="max-w-screen-xl mx-auto px-4 flex items-center justify-start h-screen md:px-8">
      <div className="max-w-lg mx-auto flex-1 flex-row-reverse gap-12 items-center justify-between md:max-w-none md:flex">
        <div className="flex-1 max-w-lg">
          <AspectRatio ratio={16 / 9}>
            <Image alt="Page not found" src="/image/not-found.svg" fill />
          </AspectRatio>
        </div>
        <div className="mt-12 flex-1 max-w-lg space-y-3 md:mt-0">
          <h3 className="header-3">Hata 404</h3>
          <h1 className="header-1">Sayfa Bulunamadı</h1>
          <p className="">
            Aradığınız sayfa bulunamadı. Lütfen tekrar deneyin ya da geri dönün.
          </p>
          <Link
            href="/"
            className="text-primary-500 duration-150 hover:text-primary-500/50 font-medium inline-flex items-center gap-x-1"
          >
            <IoArrowBack />
            Geri dön
          </Link>
        </div>
      </div>
    </main>
  );
};

export default NotFound;
