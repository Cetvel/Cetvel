declare type SearchParamProps = {
  params: { [key: string]: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

declare type Task = {
  _id: string;
  title: string;
  tag: string;
  status: string;
  startsAt: Date;
  endsAt: Date;
};

declare type Focus = {
  _id: string;
  tag: string;
  title: string;
  duration: number;
  startsAt: Date;
  endsAt: Date;
};

declare type Tag = {
  _id: string;
  label: string;
  value: string;
};

declare type Goal = {
  _id: string;
  title: string;
  totalUnits: number;
  target: number;
  startsAt: Date;
  endsAt: Date;
};

declare type notification = {
  _id: string;
  title: string;
  message: string;
  type: string;
  timestamp: Date;
  onRead: boolean;
  onDismiss: boolean;
};

declare type Action = {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  variant?: 'default' | 'destructive';
  alert?: boolean;
};

declare enum TaskStatus {
  COMPLETED = 'completed',
  INCOMPLETE = 'incomplete',
}

declare type UserClass = '9' | '10' | '11' | '12' | 'Mezun';
declare type ExamType = 'TYT' | 'AYT' | 'LGS' | 'DGS' | 'YDS' | 'ALES' | 'KPSS';
declare type AYTField = 'SAY' | 'EA' | 'SOZ';
declare type StudyField = 'Sayısal' | 'Eşit Ağırlık' | 'Sözel' | 'Dil';

declare interface FieldBase {
  name: string;
  label: string;
  placeholder: string;
}

declare interface Error {
  message: string;
  status: number;
}

declare interface NumberField extends FieldBase {
  type: 'number';
  max: number;
}

declare interface SelectField extends FieldBase {
  type: 'select';
  options: { value: string; label: string }[];
}

declare type FormField = NumberField | SelectField;
