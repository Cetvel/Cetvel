declare type SearchParamProps = {
  params: { [key: string]: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

declare type Task = {
  id: string;
  title: string;
  tag: string;
  status: string;
  startsAt: Date;
  endsAt: Date;
};

declare type Focus = {
  id: string;
  description: string;
  time: string;
  date: Date;
};

declare type Tag = {
  id: string;
  label: string;
  value: string;
};

declare type studyField = "YKS" | "KPSS" | "LGS";
