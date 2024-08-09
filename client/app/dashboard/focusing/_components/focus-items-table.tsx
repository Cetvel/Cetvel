import { DataTable } from "@/components/global/data-table";
import React from "react";
import { columns } from "./columns";

const data = [
  {
    id: 1,
    description: "description 1",
    time: "time 1",
    date: new Date(),
  },
  {
    id: 2,
    description: "description 2",
    time: "time 2",
    date: new Date(),
  },
  {
    id: 3,
    description: "description 3",
    time: "time 3",
    date: new Date(),
  },
];

const FocusItemsTable = () => {
  return (
    <DataTable
      columns={columns}
      data={data}
      searchableColumn="description"
      dateFilterColumn="date"
    />
  );
};

export default FocusItemsTable;
