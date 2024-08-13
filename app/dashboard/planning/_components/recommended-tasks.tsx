import { Card, CardContent, CardHeader } from "@/components/ui/card";
import React from "react";
import { IoSparkles } from "react-icons/io5";
import RecommendedTask from "./recommended-task";

const recommendedTasksMock: Task[] = [
  {
    id: "1",
    title: "Matematik çözümü",
    tag: "okul",
    startsAt: new Date(),
    endsAt: new Date(),
    status: "active",
    reminder: new Date(),
  },
  {
    id: "2",
    title: "Fizik ödevi",
    tag: "okul",
    startsAt: new Date(),
    endsAt: new Date(),
    status: "active",
    reminder: new Date(),
  },
  {
    id: "3",
    title: "Matematik konu çalışması",
    tag: "is",
    startsAt: new Date(),
    endsAt: new Date(),
    status: "active",
    reminder: new Date(),
  },
  {
    id: "4",
    title: "Kimya genel tekrar",
    tag: "is",
    startsAt: new Date(),
    endsAt: new Date(),
    status: "active",
    reminder: new Date(),
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
