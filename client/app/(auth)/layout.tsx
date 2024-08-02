import { Card } from "@/components/ui/card";
import Image from "next/image";
import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main
      className="w-full min-h-screen flex flex-col items-center justify-center py-20"
      data-theme="dark"
    >
      <div className="flex space-x-4 items-center mb-10">
        <Image src="image/logo.svg" width={50} height={50} alt="Cetvel Logo" />
        <h1 className="text-3xl font-bold">Cetvel</h1>
      </div>
      <Card className="max-w-2xl w-full">{children}</Card>
    </main>
  );
};

export default AuthLayout;
