import React, { useCallback, useEffect, useState } from 'react';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  SortingState,
  getSortedRowModel,
  ColumnFiltersState,
  getFilteredRowModel,
} from '@tanstack/react-table';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DatePickerWithRange } from './date-range-picker';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from '../ui/dropdown-menu';
import { Checkbox } from '@/components/ui/checkbox';

interface BaseDataTableProps<T> {
  data: T[];
  columns: ColumnDef<T>[];
  searchableColumn?: string;
  additionalComponents?: React.ReactNode;
  dateColumn?: string;
  dateRangeColumns?: {
    placeholder?: string;
    start: string;
    end: string;
  }[];
  selectColumn?: string;
  selectColumnOptions?: {
    value: string;
    label: string;
  }[];
  onSelectColumnChange?: (value: string) => void;
  selectColumnDefaultSelected?: string;
  selectPlaceholder?: string;
  onSelectChange?: (value: string) => void;
  createColumnsFunction?: (type: string) => ColumnDef<T>[];
  initialSortColumn?: string;
  initialSortDirection?: 'asc' | 'desc';
  pageSize?: number;
  showGlobalFilter?: boolean;
  customRowActions?: (row: T) => React.ReactNode;
  enableMultiSelect?: boolean;
  bulkActions?: {
    label: string;
    action: (selectedRows: T[], clearSelection: () => void) => void;
  }[];
  getRowId?: (row: T) => string;
}

export function BaseDataTable<T>({
  data,
  columns: initialColumns,
  searchableColumn,
  additionalComponents,
  dateColumn,
  dateRangeColumns,
  selectColumn,
  selectColumnOptions,
  onSelectColumnChange,
  selectColumnDefaultSelected,
  selectPlaceholder,
  initialSortColumn,
  initialSortDirection = 'desc',
  pageSize = 10,
  showGlobalFilter = false,
  createColumnsFunction,
  onSelectChange,
  customRowActions,
  enableMultiSelect = false,
  bulkActions = [],
  getRowId = (row: any) => row.id,
}: BaseDataTableProps<T>) {
  const [sorting, setSorting] = useState<SortingState>(
    initialSortColumn
      ? [{ id: initialSortColumn, desc: initialSortDirection === 'desc' }]
      : []
  );
  const [columns, setColumns] = useState<ColumnDef<T>[]>(initialColumns);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [columnVisibility, setColumnVisibility] = useState({});
  const [selectedValue, setSelectedValue] = useState(
    selectColumnDefaultSelected || selectColumnOptions?.[0]?.value || ''
  );
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
    onGlobalFilterChange: setGlobalFilter,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      globalFilter,
      columnVisibility,
      rowSelection,
    },
    initialState: {
      pagination: {
        pageSize,
      },
    },
    enableRowSelection: enableMultiSelect,
    enableMultiRowSelection: enableMultiSelect,
    getRowId,
  });

  const clearRowSelection = useCallback(() => {
    setRowSelection({});
  }, []);

  useEffect(() => {
    if (createColumnsFunction && selectedValue) {
      const newColumns = createColumnsFunction(selectedValue);
      setColumns(newColumns);
    }
  }, [selectedValue, createColumnsFunction]);

  const handleSelectChange = (value: string) => {
    setSelectedValue(value);
    onSelectColumnChange?.(value);
    table.getColumn(selectColumn!)?.setFilterValue(value);
    if (onSelectChange) {
      onSelectChange(value);
    }
  };

  const selectedRows = table
    .getPreFilteredRowModel()
    .rows.filter((row) => row.getIsSelected())
    .map((row) => row.original);

  useEffect(() => {
    if (enableMultiSelect && !columns.find((col) => col.id === 'select')) {
      const selectionColumn: ColumnDef<T> = {
        id: 'select',
        header: ({ table }) => (
          <Checkbox
            checked={table.getIsAllPageRowsSelected()}
            onCheckedChange={(value) =>
              table.toggleAllPageRowsSelected(!!value)
            }
            aria-label='Tümünü seç'
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label='Satırı seç'
          />
        ),
        enableSorting: false,
        enableHiding: false,
      };
      setColumns([selectionColumn, ...columns]);
    }
  }, [enableMultiSelect, columns]);

  return (
    <div>
      <div className='flex items-center justify-between pb-4'>
        <div className='flex items-center gap-4 flex-wrap'>
          {showGlobalFilter && (
            <Input
              placeholder='Global arama...'
              value={globalFilter}
              onChange={(e) => setGlobalFilter(e.target.value)}
              className='max-w-sm'
            />
          )}
          {searchableColumn && (
            <Input
              placeholder='Arama yap...'
              value={
                (table
                  .getColumn(searchableColumn)
                  ?.getFilterValue() as string) ?? ''
              }
              onChange={(event) =>
                table
                  .getColumn(searchableColumn)
                  ?.setFilterValue(event.target.value)
              }
              className='max-w-sm'
            />
          )}
          {dateColumn && (
            <DatePickerWithRange
              onDateChange={(range) => {
                table.getColumn(dateColumn)?.setFilterValue(range);
              }}
            />
          )}
          {dateRangeColumns &&
            dateRangeColumns.map((range, index) => (
              <DatePickerWithRange
                key={index}
                placeholder={range.placeholder}
                onDateChange={(dateRange) => {
                  table.getColumn(range.start)?.setFilterValue(dateRange);
                  table.getColumn(range.end)?.setFilterValue(dateRange);
                }}
              />
            ))}
          {selectColumn && selectColumnOptions && (
            <Select value={selectedValue} onValueChange={handleSelectChange}>
              <SelectTrigger className='w-[180px]'>
                <SelectValue>
                  {selectColumnOptions.find(
                    (option) => option.value === selectedValue
                  )?.label ||
                    selectPlaceholder ||
                    'Seçiniz'}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {selectColumnOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
          {additionalComponents}
        </div>
        <div className='flex items-center gap-2'>
          {enableMultiSelect && bulkActions.length > 0 && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant='outline' disabled={selectedRows.length === 0}>
                  İşlemler ({selectedRows.length})
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {bulkActions.map((action, index) => (
                  <DropdownMenuItem
                    key={index}
                    onClick={() =>
                      action.action(selectedRows, clearRowSelection)
                    }
                  >
                    {action.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
      <div className='rounded-md border'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
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
                  className='h-24 text-center'
                >
                  Sonuç bulunamadı.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className='flex items-center justify-end space-x-2 py-4'>
        <Button
          variant='outline'
          size='sm'
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Önceki
        </Button>
        <Button
          variant='outline'
          size='sm'
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Sonraki
        </Button>
      </div>
    </div>
  );
}
