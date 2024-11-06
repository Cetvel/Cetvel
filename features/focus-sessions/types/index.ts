declare type FocusSession = {
  _id: string;
  tag: string;
  title: string;
  duration: number;
  startsAt: Date;
  endsAt: Date;
};

declare type StatsData = {
  todayStatistics: {
    totalDuration: number;
    totalPomodoros: number;
  };
  lastWeekStatistics: {
    totalDuration: number;
    averageDuration: number;
    totalPomodoros: number;
  };
  chartData: {
    day: string;
    hours: number;
  }[];
};
