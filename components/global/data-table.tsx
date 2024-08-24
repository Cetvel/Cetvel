"use client";

import {
  ColumnDef,
  SortingState,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { DatePickerWithRange } from "./date-range-picker";
import { ArrowLeft, ArrowRight, Search } from "lucide-react";
import AddTask from "./add-task";
import { SelectedTaskActions } from "@/app/dashboard/tasks/_components/selected-task-actions";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  searchableColumn: string;
  dataType: "pomodoro" | "task";
}

export function DataTable<TData, TValue>({
  columns,
  data,
  searchableColumn,
  dataType,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      rowSelection,
    },
    initialState: {
      pagination: {
        pageSize: 5,
      },
    },
  });

  const selectedTasks = table
    .getFilteredSelectedRowModel()
    .rows.map((row) => row.original as Task);

  const handleActionComplete: () => void = () => {
    table.resetRowSelection();
  };

  return (
    <>
      <div className="flex space-x-2 items-center mb-4">
        <Input
          placeholder="Arama yap..."
          value={
            (table.getColumn(searchableColumn)?.getFilterValue() as string) ??
            ""
          }
          onChange={(event) =>
            table
              .getColumn(searchableColumn)
              ?.setFilterValue(event.target.value)
          }
          className="max-w-xs"
        />

        {dataType === "pomodoro" && (
          <DatePickerWithRange
            onDateChange={(date) => {
              table.getColumn("date")?.setFilterValue(date);
            }}
          />
        )}

        {dataType === "task" && <AddTask />}
      </div>

      {selectedTasks.length > 0 && dataType === "task" && (
        <SelectedTaskActions
          selectedTasks={selectedTasks}
          onActionComplete={handleActionComplete}
        />
      )}

      {table.getFilteredSelectedRowModel().rows.length > 0 && (
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredRowModel().rows.length} sonuçtan{" "}
          {table.getFilteredSelectedRowModel().rows.length} tanesi seçildi.
        </div>
      )}

      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="flex items-center justify-end space-x-4 mt-4">
        <Button
          variant={"secondary"}
          size={"sm"}
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          <ArrowLeft size={16} />
          Önceki
        </Button>
        <Button
          variant={"secondary"}
          size={"sm"}
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Sonraki
          <ArrowRight size={16} />
        </Button>
      </div>
    </>
  );
}
