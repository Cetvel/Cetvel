"use client";

import { DataTable } from "@/components/global/data-table";
import React from "react";
import { columns } from "./columns";
import useSWR from "swr";
import { fetcher } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

const FocusItemsTable = () => {
  const { data, isLoading, error } = useSWR("/pomodoro", fetcher);

  if (isLoading) {
    return <Skeleton className="h-20" />;
  }

  if (error && !isLoading) {
    return (
      <Alert>
        <AlertCircle size={18} />
        <AlertTitle>Bir hata oluştu.</AlertTitle>
        <AlertDescription>
          Lütfen sayfayı yenileyin ya da daha sonra tekrar deneyin.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <DataTable
      columns={columns}
      data={data}
      searchableColumn="title"
      dataType="pomodoro"
    />
  );
};

export default FocusItemsTable;
