import { DataTable } from "@/components/global/data-table";
import React from "react";
import { columns } from "./columns";

const data = [
  {
    id: 1,
    description: "description 1",
    time: "13:00:00",
    date: new Date(),
  },
  {
    id: 2,
    description: "description 2",
    time: "25:00:00",
    date: new Date(),
  },
  {
    id: 3,
    description: "description 3",
    time: "30:00:00",
    date: new Date(),
  },
];

const FocusItemsTable = () => {
  return (
    <DataTable columns={columns} data={data} searchableColumn="description" />
  );
};

export default FocusItemsTable;
