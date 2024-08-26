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
  type: string;
  unit: string;
  target: number;
  startsAt: Date;
  endsAt: Date;
};

declare type Action = {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  variant?: "default" | "destructive";
  alert?: boolean;
};

declare enum TaskStatus {
  COMPLETED = "completed",
  INCOMPLETE = "incomplete",
}

declare type studyField = "YKS" | "KPSS" | "LGS";
