declare type SearchParamProps = {
  params: { [key: string]: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

declare enum TaskStatus {
  COMPLETED = "completed",
  ACTIVE = "active",
}

declare type Task = {
  id: string;
  title: string;
  tag: string;
  status: string;
  startsAt: string;
  endsAt: string;
  reminder: string;
};

declare type studyField = "YKS" | "KPSS" | "LGS";
