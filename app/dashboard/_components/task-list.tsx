"use client";

import React, { useState } from "react";
import {} from "react-icons/io5";
import TagManager from "./tag-manager";
import Task from "./task";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Reorder } from "framer-motion";
import { filterTasks } from "./task-filter";
import AddTask from "@/components/global/add-task";
import TagFilter from "@/components/global/tag-filter";
import StatusFilter from "@/components/global/status-filter";

const tasksMock = [
  {
    id: "1",
    title: "Matematik çözümü",
    tag: "Okul",
    startsAt: "2022-10-10T09:00:00",
    endsAt: "2022-10-10T10:00:00",
    status: "completed",
  },
  {
    id: "2",
    title: "Fizik ödevi",
    tag: "Okul",
    startsAt: "2022-10-10T10:20:00",
    endsAt: "2022-10-10T11:00:00",
    status: "active",
  },
  {
    id: "3",
    title: "Matematik konu çalışması",
    tag: "İş",
    startsAt: "2022-10-10T11:30:00",
    endsAt: "2022-10-10T12:40:00",
    status: "active",
  },
  {
    id: "4",
    title: "Kimya genel tekrar",
    tag: "İş",
    startsAt: "2022-10-10T13:00:00",
    endsAt: "2022-10-10T14:00:00",
    status: "completed",
  },
];

const Tasktag = () => {
  const [tasks, setTasks] = useState(tasksMock);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);

  return (
    <>
      <aside className="flex flex-col gap-4 flex-grow lg:col-span-5">
        <div className="items-center justify-between flex">
          <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6 md:pl-4 flex-1">
            <h2 className="text-lg font-bold text-base-content whitespace-nowrap mt-0.5">
              Bugünün Görevleri
            </h2>
            <div className="flex gap-2">
              <TagFilter onChange={setSelectedTag} />
              <StatusFilter onChange={setSelectedStatus} />
              <TagManager />
            </div>
          </div>
          <AddTask />
        </div>

        <ScrollArea className="bg-card rounded-xl border border-card p-2 md:p-4 h-[300px] lg:h-[292px] flex-grow overflow-x-hidden">
          <Reorder.Group axİş="y" values={tasks} onReorder={setTasks}>
            <div className="flex flex-col gap-3 w-full">
              {filterTasks(tasks, selectedTag, selectedStatus).map(
                (item: any, i: number) => (
                  <Task key={item.id} task={item} />
                )
              )}
            </div>
          </Reorder.Group>
        </ScrollArea>
      </aside>
    </>
  );
};

export default Tasktag;
