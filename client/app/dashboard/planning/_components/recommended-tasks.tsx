import { Card, CardContent, CardHeader } from "@/components/ui/card";
import React from "react";
import { IoSparkles } from "react-icons/io5";
import RecommendedTask from "./recommended-task";

const recommendedTasksMock: Task[] = [
  {
    id: "1",
    title: "Matematik çözümü",
    tag: "okul",
    startsAt: "2022-10-10T09:00:00",
    endsAt: "2022-10-10T10:00:00",
    status: "active",
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
    status: "active",
  },
];

const RecommendedTasks = () => {
  return (
    <Card className="h-full">
      <CardHeader>
        <h3 className="header-3 flex">
          <IoSparkles className="w-6 h-6 mr-2 text-primary-500" />
          Önerilen görevler
        </h3>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        {recommendedTasksMock.map((task: Task) => (
          <RecommendedTask key={task.id} task={task} />
        ))}
      </CardContent>
    </Card>
  );
};

export default RecommendedTasks;
