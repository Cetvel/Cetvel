"use client";

import { padTo2Digits } from "@/lib/utils";
import React from "react";
import { motion } from "framer-motion";

const tasks = [
  {
    id: 1,
    title: "Yemek",
    startsAt: new Date(2021, 7, 1, 12, 30),
    endsAt: new Date(2021, 7, 1, 13, 30),
  },
  {
    id: 2,
    title: "Spor",
    startsAt: new Date(2021, 7, 1, 14, 0),
    endsAt: new Date(2021, 7, 1, 15, 0),
  },
  {
    id: 3,
    title: "Ders",
    startsAt: new Date(2021, 7, 1, 15, 30),
    endsAt: new Date(2021, 7, 1, 17, 0),
  },
];

// Framer Motion Variants

const taskVariants = {
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 360,
      damping: 20,
      duration: 0.3,
      delay: i * 0.3,
    },
  }),
  hidden: {
    opacity: 0,
    x: 100,
  },
};

const Banner = () => {
  return (
    <div
      className="relative rounded-xl shadow-sm lg:col-span-5 h-full p-3 md:p-6 gap-6 md:gap-0 flex flex-col justify-between"
      style={{
        backgroundImage:
          "url(https://images.wallpaperscraft.com/image/single/planet_satellite_horizon_127491_3692x2308.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundBlendMode: "multiply",
      }}
    >
      <div className="flex flex-col gap-2 w-full ">
        <h2 className="text-3xl md:text-4xl text-white font-bold">
          Tekrar Hoşgeldin Ömer!
        </h2>
        <p>
          Günlük motivasyon sözü:{" "}
          <span className="font-medium text-accent-content">
            &quot;Başarının sırrı, pes etmemekte yatar.&quot;
          </span>
        </p>
      </div>
      <div className="flex w-full justify-end">
        <div className="rounded-xl border border-neutral-200 dark:border-neutral-500 bg-white dark:bg-dark-500 !bg-opacity-85 backdrop-blur-xl p-4 flex flex-col gap-4 !w-max overflow-hidden">
          <h3 className="md:text-lg">Yaklaşanlar</h3>
          {tasks &&
            (tasks.length > 0 ? (
              tasks.slice(0, 2).map((task, i) => {
                return (
                  <motion.div
                    custom={i}
                    variants={taskVariants}
                    animate="visible"
                    initial="hidden"
                    key={task.id}
                    className="pl-4 pr-8 border-l-4 border-primary-500"
                  >
                    <h4 className="font-medium">{task.title}</h4>
                    <p className="text-dark-700 dark:text-light-600 text-sm">
                      {padTo2Digits(task.startsAt.getHours()) +
                        ":" +
                        padTo2Digits(task.startsAt.getMinutes())}{" "}
                      -{" "}
                      {padTo2Digits(task.endsAt.getHours()) +
                        ":" +
                        padTo2Digits(task.endsAt.getMinutes())}
                    </p>
                  </motion.div>
                );
              })
            ) : (
              <div className="pl-4 pr-8 border-l-4 border-primary">
                <h4 className="font-medium text-accent-content">Görev yok</h4>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Banner;
