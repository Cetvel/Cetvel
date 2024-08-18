"use client"

import React from "react";
import Banner from "./_components/banner";
import TaskList from "./_components/task-list";
import FocusTimer from "./_components/focus-timer";
import PageHeader from "@/components/global/page-header";
import { useAuth } from "@clerk/nextjs";
import useSWR from "swr";
const fetcher = (url : string) => fetch(url).then(res => res.json())


// const tasks = [
//   {
//     id: 1,
//     title: "Task 1",
//     status: "completed",
//     tags: ["tag1", "tag2"],
//   },
//   {
//     id: 2,
//     title: "Task 2",
//     status: "active",
//     tags: ["tag1", "tag3"],
//   },
//   {
//     id: 3,
//     title: "Task 3",
//     status: "active",
//     tags: ["tag2", "tag3"],
//   },
// ];



export const   page =  () => {

  const { data, error } = useSWR('http://localhost:3000/api/todo/today', fetcher)
  const tasks = data


  if (error) return <div>failed to load</div>
  if (!tasks) return <div>loading...</div>
  console.log('Returned tasks:', tasks)
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
