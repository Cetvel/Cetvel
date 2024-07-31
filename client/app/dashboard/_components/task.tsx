"use client";

import React, { useState } from "react";
import { AnimatePresence, Reorder, motion } from "framer-motion";
import { IoChevronForwardOutline } from "react-icons/io5";
import { format } from "date-fns";
import { useModal } from "@/providers/modal-provider";

type Props = {
  task: any;
};

const Task = ({ task }: Props) => {
  const { setOpen } = useModal();
  const [isDragging, setIsDragging] = useState(false);

  return (
    <AnimatePresence>
      <Reorder.Item
        value={task}
        exit={{
          opacity: 0,
        }}
        whileDrag={{
          rotate: -3.2,
        }}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={() => setIsDragging(false)}
      >
        <motion.button
          className="flex w-full text-sm md:text-base items-center gap-2 px-4 lg:px-6 py-4 justify-between border border-card rounded-xl hover:bg-secondary transition-colors"
          onClick={() => {
            /* if (!isDragging) setOpen(<TaskModal task={task} />); */
          }}
        >
          <h3 className="text-start">{task.title}</h3>

          <div>
            <div className="text-secondary-content flex gap-1 lg:gap-4 items-center">
              <p className="text-base-content mt-[0.5px] whitespace-nowrap">
                {`${format(task.startsAt, "HH:mm")} - ${format(
                  task.endsAt,
                  "HH:mm"
                )}`}
              </p>
              <IoChevronForwardOutline className="text-secondary-content w-4 h-4" />
            </div>
          </div>
        </motion.button>
      </Reorder.Item>
    </AnimatePresence>
  );
};

export default Task;
