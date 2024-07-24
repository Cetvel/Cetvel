import BgBlob from "@/components/ui/bg-blobs";
import Image from "next/image";
import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main
      className="w-full min-h-screen flex flex-col items-center justify-center"
      data-theme="dark"
    >
      <BgBlob />
      <div className="flex space-x-4 items-center mb-10">
        <Image
          src="image/logo.svg"
          width={50}
          height={50}
          alt="TanjantPro Logo"
        />
        <h1 className="text-3xl font-bold">TanjantPro</h1>
      </div>
      <div className="card max-w-xl">{children}</div>
    </main>
  );
};

export default AuthLayout;
