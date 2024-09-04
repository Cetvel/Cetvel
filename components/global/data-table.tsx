import React, { useState, useEffect, useCallback } from 'react';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  SortingState,
  ColumnFiltersState,
  PaginationState,
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
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from '../ui/dropdown-menu';
import { Checkbox } from '@/components/ui/checkbox';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

export interface ApiResponse<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    pageSize: number;
    totalPages?: number;
  };
  [key: string]: any;
}

export interface FetchDataOptions {
  pageIndex: number;
  pageSize: number;
  sorting: SortingState;
  filters: ColumnFiltersState;
  globalFilter: string;
}

interface BaseDataTableProps<T> {
  columns: ColumnDef<T>[];
  fetchData: (options: FetchDataOptions) => Promise<ApiResponse<T>>;
  initialSort?: SortingState;
  initialFilter?: ColumnFiltersState;
  pageSize?: number;
  showColumnToggle?: boolean;
  showGlobalFilter?: boolean;
  enableMultiSelect?: boolean;
  bulkActions?: {
    label: string;
    action: (selectedRows: T[], clearSelection: () => void) => void;
  }[];
  getRowId?: (row: T) => string;
  renderCustomFilters?: () => React.ReactNode;
  renderAdditionalComponents?: () => React.ReactNode;
  dataPath?: string; // Optional prop to specify the path to the data in the API response
  metaPath?: string; // Optional prop to specify the path to the meta information in the API response
}

export function BaseDataTable<T>({
  columns,
  fetchData,
  initialSort = [],
  initialFilter = [],
  pageSize = 10,
  showColumnToggle = false,
  showGlobalFilter = false,
  enableMultiSelect = false,
  bulkActions = [],
  getRowId = (row: any) => row.id,
  renderCustomFilters,
  renderAdditionalComponents,
  dataPath = 'data',
  metaPath = 'meta',
}: BaseDataTableProps<T>) {
  const [data, setData] = useState<T[]>([]);
  const [totalRowCount, setTotalRowCount] = useState(0);
  const [sorting, setSorting] = useState<SortingState>(initialSort);
  const [columnFilters, setColumnFilters] =
    useState<ColumnFiltersState>(initialFilter);
  const [globalFilter, setGlobalFilter] = useState('');
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});
  const [{ pageIndex, pageSize: tablePageSize }, setPagination] =
    useState<PaginationState>({
      pageIndex: 0,
      pageSize: pageSize,
    });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchApiData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await fetchData({
        pageIndex,
        pageSize: tablePageSize,
        sorting,
        filters: columnFilters,
        globalFilter,
      });
      setData(result[dataPath] as T[]);
      setTotalRowCount(result[metaPath].total);
    } catch (e) {
      setError('Veri yüklenirken bir hata oluştu.');
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }, [
    fetchData,
    pageIndex,
    tablePageSize,
    sorting,
    columnFilters,
    globalFilter,
    dataPath,
    metaPath,
  ]);

  useEffect(() => {
    fetchApiData();
  }, [fetchApiData]);

  const table = useReactTable({
    data,
    columns,
    pageCount: Math.ceil(totalRowCount / tablePageSize),
    state: {
      sorting,
      columnFilters,
      globalFilter,
      columnVisibility,
      rowSelection,
      pagination: { pageIndex, pageSize: tablePageSize },
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    manualSorting: true,
    manualFiltering: true,
    enableRowSelection: enableMultiSelect,
    enableMultiRowSelection: enableMultiSelect,
    getRowId,
  });

  const clearRowSelection = useCallback(() => {
    setRowSelection({});
  }, []);

  const selectedRows = table
    .getPreFilteredRowModel()
    .rows.filter((row) => row.getIsSelected())
    .map((row) => row.original);

  if (isLoading) return <Skeleton className='h-36 rounded-xl' />;
  if (error)
    return (
      <Alert variant='destructive'>
        <AlertCircle size={16} className='text-destructive' />
        <AlertTitle>Veri yüklenemedi</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );

  return (
    <div>
      <div className='flex items-center justify-between pb-4'>
        <div className='flex items-center gap-4'>
          {showGlobalFilter && (
            <Input
              placeholder='Global arama...'
              value={globalFilter}
              onChange={(e) => setGlobalFilter(e.target.value)}
              className='max-w-sm'
            />
          )}
          {renderCustomFilters && renderCustomFilters()}
          {renderAdditionalComponents && renderAdditionalComponents()}
        </div>
        <div className='flex items-center gap-2'>
          {showColumnToggle && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant='outline'>Sütunlar</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align='end'>
                {table
                  .getAllColumns()
                  .filter((column) => column.getCanHide())
                  .map((column) => {
                    return (
                      <DropdownMenuCheckboxItem
                        key={column.id}
                        className='capitalize'
                        checked={column.getIsVisible()}
                        onCheckedChange={(value) =>
                          column.toggleVisibility(!!value)
                        }
                      >
                        {column.id}
                      </DropdownMenuCheckboxItem>
                    );
                  })}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
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
      <div className='flex items-center justify-between space-x-2 py-4'>
        <div>
          Toplam {totalRowCount} kayıttan {pageIndex * tablePageSize + 1} -{' '}
          {Math.min((pageIndex + 1) * tablePageSize, totalRowCount)} arası
          gösteriliyor
        </div>
        <div className='flex gap-2'>
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
    </div>
  );
}
