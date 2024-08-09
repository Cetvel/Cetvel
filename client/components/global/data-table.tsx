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
import { IoArrowBack, IoArrowForward } from "react-icons/io5";
import { Input } from "../ui/input";
import { DatePickerWithPresets } from "./date-picker-with-presets";
import { format } from "date-fns";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  searchableColumn: string;
  dateFilterColumn?: string;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  searchableColumn,
  dateFilterColumn,
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
  });

  return (
    <>
      <Input
        placeholder="Ara..."
        value={
          (table.getColumn(searchableColumn)?.getFilterValue() as string) ?? ""
        }
        onChange={(event) =>
          table
            .getColumn(searchableColumn)
            ?.setFilterValue(format(event.target.value, "dd-MM-yyyy"))
        }
        className="max-w-sm mb-4 shad-input border-card"
      />

      {dateFilterColumn && (
        <DatePickerWithPresets
          onDateChange={(date) => {
            table.getColumn(dateFilterColumn)?.setFilterValue(date);
          }}
        />
      )}

      <div className="border-card rounded-xl">
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
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex w-full space-x-4 pt-4 items-center justify-end">
        <Button
          variant={"secondary"}
          size={"sm"}
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          <IoArrowBack className="mr-2" />
          Önceki
        </Button>
        <Button
          variant={"secondary"}
          size={"sm"}
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Sonraki
          <IoArrowForward className="ml-2" />
        </Button>
      </div>
    </>
  );
}
