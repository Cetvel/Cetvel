import React from "react";
import Banner from "./_components/banner";
import TaskList from "./_components/task-list";
import FocusTimer from "./_components/focus-timer";
import PageHeader from "@/components/global/page-header";

const tasks: Task[] = [
  {
    id: "skdfjsdkjf",
    title: "Task 1",
    status: "active",
    tag: "work",
    date: new Date(),
  },
  {
    id: "skdfjsdkjf",
    title: "Task 2",
    status: "active",
    tag: "work",
    date: new Date(),
  },
  {
    id: "skdfjsdkjf",
    title: "Task 3",
    status: "active",
    tag: "work",
    date: new Date(),
  },
];
const page = async () => {
  return (
    <>
      <PageHeader title="Panel" />
      <div className="flex flex-col gap-6 h-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 place-items-stretch lg:grid-cols-7 flex-1 gap-y-6 gap-x-6 items-center">
          <Banner />
          <FocusTimer />
        </div>
        <TaskList taskData={tasks} />
      </div>
    </>
  );
};

export default page;
