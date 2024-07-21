"use client";

import React, { useContext } from "react";
import Image from "next/image";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { HoverEffect } from "@/components/ui/card-hover-effect";
import { IoFlashOutline, IoTimeOutline } from "react-icons/io5";

const features = [
  {
    image: "/image/features/todos.svg",
    icon: <IoFlashOutline size={20} />,
    title: "Görevler",
    description: "Saniyeler içinde görevlerinizi planlayın ve organize edin",
  },
  {
    image: "/image/features/pomodoro.svg",
    icon: <IoTimeOutline size={20} />,
    title: "Pomodoro",
    description: "Pomodoro tekniği ile daha verimli çalışın",
  },
];

const Features = () => {
  return (
    <section
      id="features"
      className="py-20 md:pt-0 bg-dark-200 flex flex-col md:items-center px-6 md:px-32 mx-auto"
    >
      <ContainerScroll>
        <Image
          src={"/image/app.png"}
          alt="hero"
          height={720}
          width={1400}
          className="mx-auto rounded-2xl object-cover h-full object-left-top border border-neutral-200 dark:border-neutral-500 z-20"
          draggable={false}
        />
      </ContainerScroll>

      <h2 className="text-4xl font-bold mb-6">TanjantPro Nedir</h2>
      <p className="text-lg text-secondary-content max-w-4xl mb-10">
        TanjantPro, görevlerinizi planlamanıza ve organize etmenize yardımcı
        olan bir uygulamadır. Saniyeler içinde görevlerinizi oluşturabilir,
        takviminize ekleyebilir ve önceliklerini belirleyebilirsiniz. Ayrıca
        Pomodoro tekniği ile daha verimli çalışmanızı sağlar. Uygulama,
        kullanıcı dostu arayüzü ve etkileyici özellikleriyle işlerinizi daha
        kolay hale getirir.
      </p>
    </section>
  );
};

export default Features;
