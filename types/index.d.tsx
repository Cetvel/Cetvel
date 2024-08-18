declare type SearchParamProps = {
  params: { [key: string]: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

declare type Task = {
  id: string;
  title: string;
  tag: string;
  status: string;
  date: Date;
};

declare type FocusItem = {
  id: number;
  description: string;
  time: string;
  date: Date;
};

declare type studyField = "YKS" | "KPSS" | "LGS";
