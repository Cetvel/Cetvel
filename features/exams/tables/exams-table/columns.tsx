import { ColumnDef } from '@tanstack/react-table';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Ellipsis, Trash } from 'lucide-react';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';
import { convertSecondsToTime } from '@/lib/utils';
import { deleteExam } from '@/features/exams/actions/exam';
import { ColumnHeader } from '@/components/global/column-header';
import { SubjectConfig } from '../../types';
import { examConfigs } from '../../configs';

export interface ExamResult {
  _id: string;
  kindeId: string;
  examName: string;
  solvingDate: string;
  examType: ExamType;
  solvingTime: number;
  [key: string]: any;
  createdAt: string;
  updatedAt: string;
}

interface SubjectResult {
  solvingTime?: number;
  correct: number;
  wrong: number;
}

const baseColumns: ColumnDef<ExamResult>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
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
  },
  {
    id: 'examName',
    accessorKey: 'examName',
    header: ({ column }) => (
      <ColumnHeader column={column} title='Sınav Adı' sortable />
    ),
  },
  {
    id: 'examType',
    accessorKey: 'examType',
    header: ({ column }) => <ColumnHeader column={column} title='Sınav Türü' />,
    cell: ({ row }) => (
      <Badge>{(row.getValue('examType') as string).toUpperCase()}</Badge>
    ),
  },
  {
    id: 'solvingDate',
    accessorKey: 'solvingDate',
    header: ({ column }) => (
      <ColumnHeader column={column} title='Çözüm Tarihi' sortable hideable />
    ),
    cell: ({ row }) =>
      format(new Date(row.getValue('solvingDate') as string), 'dd MMMM yyyy', {
        locale: tr,
      }),
    filterFn: (row, columnId, filterValue) => {
      const filter_from = filterValue.from;
      const filter_to = filterValue.to;

      const date = new Date(row.original.solvingDate);

      return date >= filter_from && date <= filter_to;
    },
    sortingFn: 'datetime',
  },
  {
    id: 'solvingTime',
    accessorKey: 'solvingTime',
    header: ({ column }) => (
      <ColumnHeader column={column} title='Çözüm Süresi' hideable />
    ),
    cell: ({ row }) =>
      convertSecondsToTime(row.getValue('solvingTime') as number),
  },
];

const createSubjectColumn = <T extends ExamResult>(
  subject: SubjectConfig
): ColumnDef<T> => ({
  id: subject.name,
  accessorKey: subject.name,
  header: ({ column }) => (
    <ColumnHeader column={column} title={subject.label} />
  ),
  cell: ({ row }) => {
    const subjectData = row.getValue(subject.name) as SubjectResult | undefined;
    return subjectData ? (
      <div className='flex gap-2'>
        <span className='text-green-500 whitespace-nowrap'>
          {subjectData.correct} D
        </span>
        <p className='text-muted-foreground'>/</p>
        <span className='text-destructive whitespace-nowrap'>
          {subjectData.wrong} Y
        </span>
      </div>
    ) : (
      '-'
    );
  },
});

const actionColumn: ColumnDef<ExamResult> = {
  id: 'actions',
  cell: ({ row }) => {
    const exam = row.original;

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='ghost' size='icon-sm'>
            <span className='sr-only'>Menü</span>
            <Ellipsis size={16} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DropdownMenuLabel>Eylemler</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className='text-red-500'
            onClick={() => {
              deleteExam(exam._id);
            }}
          >
            <Trash size={16} />
            Sil
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  },
};

export function createAllColumns<T extends ExamResult>(): ColumnDef<T>[] {
  const allSubjectColumns = examConfigs.flatMap((config) =>
    config.subjects.map((subject) => createSubjectColumn<T>(subject))
  );

  const uniqueSubjectColumns = allSubjectColumns.filter(
    (column, index, self) => index === self.findIndex((t) => t.id === column.id)
  );

  return [
    ...(baseColumns as ColumnDef<T>[]),
    ...uniqueSubjectColumns,
    actionColumn as ColumnDef<T>,
  ];
}

export function createDynamicColumns<T extends ExamResult>(
  examType: string,
  aytField?: string
): ColumnDef<T>[] {
  const allColumns = createAllColumns<T>();
  const config = examConfigs.find(
    (c) => c.type.toLowerCase() === examType.toLowerCase()
  );

  if (!config) {
    return allColumns;
  }

  const subjectKeys = config.subjects
    .filter((subject) =>
      aytField ? subject.forFields?.includes(aytField) : true
    )
    .map((subject) => subject.name);
  const columnsToShow = [
    'select',
    'examName',
    'examType',
    'solvingDate',
    'solvingTime',
    ...subjectKeys,
    'actions',
  ];

  return allColumns.filter((column) =>
    columnsToShow.includes(column.id as string)
  );
}
