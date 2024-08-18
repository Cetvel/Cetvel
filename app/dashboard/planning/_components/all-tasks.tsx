"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import React, { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Reorder } from "framer-motion";
import { filterTasks } from "../../_components/task-filter";
import DetailedTask from "@/components/global/detailed-task";

const tasksMock = [
  {
    id: "1",
    title: "Matematik çözümü",
    tag: "okul",
    startsAt: "2022-10-10T09:00:00",
    endsAt: "2022-10-10T10:00:00",
    status: "completed",
  },
  {
    id: "2",
    title: "Fizik ödevi",
    tag: "okul",
    startsAt: "2022-10-10T10:20:00",
    endsAt: "2022-10-10T11:00:00",
    status: "active",
  },
  {
    id: "3",
    title: "Matematik konu çalışması",
    tag: "is",
    startsAt: "2022-10-10T11:30:00",
    endsAt: "2022-10-10T12:40:00",
    status: "active",
  },
  {
    id: "4",
    title: "Kimya genel tekrar",
    tag: "is",
    startsAt: "2022-10-10T13:00:00",
    endsAt: "2022-10-10T14:00:00",
    status: "completed",
  },
];

const AllTasks = () => {
  const [tasks, setTasks] = useState(tasksMock);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Görevler</h2>
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="flex-grow h-[280px] lg:h-[300px] overflow-x-hidden ">
          <Reorder.Group axis="y" values={tasks} onReorder={setTasks}>
            <div className="flex flex-col gap-3 w-full">
              {filterTasks(tasks, selectedTag, selectedStatus).map(
                (item: any, i: number) => (
                  <DetailedTask key={item.id} task={item} />
                )
              )}
            </div>
          </Reorder.Group>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default AllTasks;
