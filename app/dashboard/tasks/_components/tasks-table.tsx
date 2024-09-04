'use client';

import React from 'react';
import { columns } from './columns';
import AddTask from '@/components/global/add-task';
import { BaseDataTable } from '@/components/global/data-table';
import {
  completeManyTasks,
  deleteManyTasks,
  incompleteManyTasks,
  getTasksPaginated,
} from '@/lib/services/task-service';
import { mutate } from 'swr';
import { ColumnDef } from '@tanstack/react-table';

interface FetchDataOptions {
  pageIndex: number;
  pageSize: number;
  sorting: Array<{ id: string; desc: boolean }>;
  filters: Array<{ id: string; value: any }>;
  globalFilter: string;
}

const TasksTable = () => {
  const fetchTasks = async (options: FetchDataOptions) => {
    const params = {
      page: options.pageIndex + 1,
      pageSize: options.pageSize,
      sortBy: options.sorting[0]?.id,
      sortOrder: options.sorting[0]?.desc
        ? ('desc' as const)
        : ('asc' as const),
      filters: Object.fromEntries(options.filters.map((f) => [f.id, f.value])),
      search: options.globalFilter,
    };

    return getTasksPaginated(params);
  };

  const refreshData = () => {
    mutate('/tasks');
    mutate('/tasks/today');
  };

  return (
    <BaseDataTable<Task>
      columns={columns as ColumnDef<Task>[]}
      fetchData={fetchTasks}
      pageSize={5}
      initialSort={[{ id: 'startsAt', desc: true }]}
      showColumnToggle
      showGlobalFilter
      enableMultiSelect
      bulkActions={[
        {
          label: 'Tamamla',
          action: async (selectedRows, clearSelection) => {
            const ids = selectedRows.map((row) => row._id);
            await completeManyTasks(ids);
            clearSelection();
            refreshData();
          },
        },
        {
          label: 'Tamamlanmadı yap',
          action: async (selectedRows, clearSelection) => {
            const ids = selectedRows.map((row) => row._id);
            await incompleteManyTasks(ids);
            clearSelection();
            refreshData();
          },
        },
        {
          label: 'Sil',
          action: async (selectedRows, clearSelection) => {
            const ids = selectedRows.map((row) => row._id);
            await deleteManyTasks(ids);
            clearSelection();
            refreshData();
          },
        },
      ]}
      renderAdditionalComponents={() => <AddTask />}
    />
  );
};

export default TasksTable;
