import PageHeader from "@/components/global/page-header";
import React from "react";
import ExamsTable from "./_components/exams-table";

const Stats = () => {
  return (
    <>
      <PageHeader title="İstatistikler" />
      <ExamsTable />
    </>
  );
};

export default Stats;
