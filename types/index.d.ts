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
  description: string;
  time: string;
  date: Date;
};

declare type Tag = {
  _id: string;
  label: string;
  value: string;
};

declare type Action = {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  variant?: "default" | "destructive";
};

declare enum TaskStatus {
  COMPLETED = "completed",
  INCOMPLETE = "incomplete",
}

declare type studyField = "YKS" | "KPSS" | "LGS";
