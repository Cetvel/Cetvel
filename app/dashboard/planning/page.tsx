import PageHeader from "@/components/global/page-header";
import Scheduler from "./_components/scheduler";
import React from "react";
import AllTasks from "./_components/all-tasks";
import RecommendedTasks from "./_components/recommended-tasks";

const tasksMock = [
  {
    id: "1",
    title: "Yuvarlan",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    start: new Date(),
    end: new Date(),
  },
  {
    id: "2",
    title: "Diş fırçala",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    start: new Date(),
    end: new Date(),
  },
  {
    id: "3",
    title: "Kod yaz",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    start: new Date(),
    end: new Date(),
  },
];

const tags = [
  { id: "1", value: "is", label: "İş" },
  { id: "2", value: "okul", label: "Okul" },
  { id: "3", value: "kisisel", label: "Kişisel" },
];

const Page = async () => {
  return (
    <>
      <PageHeader title="Planlama" />
      <div className="grid grid-cols-6 gap-6 mb-6">
        <div className="col-span-4">
          <AllTasks />
        </div>
        <div className="col-span-2">
          <RecommendedTasks />
        </div>
      </div>
      <Scheduler tags={tags} events={tasksMock} />
    </>
  );
};

export default Page;
