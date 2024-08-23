import { LoaderCircle } from "lucide-react";
import Image from "next/image";
import React from "react";

const LoadingUI = () => {
  return (
    <aside className="w-full h-screen bg-background flex items-center justify-center flex-col z-[99999]">
      <Image src={"/image/logo.svg"} alt="Logo" width={100} height={100} />
      <LoaderCircle className="animate-spin" size={50} />
    </aside>
  );
};

export default LoadingUI;
