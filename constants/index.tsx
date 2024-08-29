import {
  BarChart,
  Book,
  Calendar,
  LayoutGrid,
  Logs,
  Rocket,
  Settings,
  Timer,
} from "lucide-react";
import { Views } from "react-big-calendar";

export const menuLinks = [
  {
    label: "Panel",
    href: "/dashboard",
    icon: <LayoutGrid size={18} />,
  },

  {
    label: "Görevler",
    href: "/dashboard/tasks",
    icon: <Logs size={18} />,
  },
  {
    label: "Planlama",
    href: "/dashboard/planning",
    icon: <Calendar size={18} />,
  },
  {
    label: "Odaklanma",
    href: "/dashboard/focusing",
    icon: <Timer size={18} />,
  },
  {
    label: "Dersler",
    href: "/dashboard/courses",
    icon: <Book size={18} />,
  },
  {
    label: "Hesaplama",
    href: "/dashboard/calculation",
    icon: <Rocket size={18} />,
  },
  {
    label: "İstatistik",
    href: "/dashboard/stats",
    icon: <BarChart size={18} />,
  },
  {
    label: "Ayarlar",
    href: "/dashboard/settings",
    icon: <Settings size={18} />,
  },
];

export const VIEW_OPTIONS = [
  { id: Views.DAY, label: "Day" },
  { id: Views.WEEK, label: "Week" },
  { id: Views.MONTH, label: "Month" },
];

export const taskStatusses = [
  { value: "incomplete", label: "Aktif" },
  { value: "completed", label: "Tamamlandı" },
];

export const StudyFieldOptions = ["YKS", "LGS", "KPSS"];

export const GoalUnitOptions = ["Saat", "Dakika", "Sayı", "Konu sayısı"];
export const GoalTypeOptions = ["Günlük", "Haftalık", "Aylık"];

export const GeneralExams = ["TYT", "AYT", "YDT", "DGS", "YDS", "ALES", "KPSS"];
export const VocationalExams = ["KPSS", "DGS", "ALES", "YDS"];
export const YKSBranchExams = [
  "tyt-mat",
  "tyt-tr",
  "tyt-science",
  "tyt-social",
  "ayt-mat",
  "ayt-science",
  "ayt-sos1",
  "ayt-sos2",
  "ayt-phy",
  "ayt-chem",
  "ayt-bio",
  "ayt-literature",
  "ayt-his1",
  "ayt-his2",
  "ayt-geo1",
  "ayt-geo2",
  "ayt-religion",
  "ayt-philosophy",
];
export const LGSBranchExams = [
  "lgs-turkish",
  "lgs-math",
  "lgs-science",
  "lgs-social",
  "lgs-english",
  "lgs-religion",
];
export const KPSSBranchExams = [
  "kpss-general",
  "kpss-education",
  "kpss-law",
  "kpss-economy",
  "kpss-engineering",
  "kpss-medicine",
  "kpss-architecture",
  "kpss-agriculture",
  "kpss-veterinary",
  "kpss-forestry",
  "kpss-fisheries",
  "kpss-islam",
  "kpss-philosophy",
];
export const DGSBranchExams = [
  "dgs-turkish",
  "dgs-math",
  "dgs-science",
  "dgs-social",
  "dgs-english",
  "dgs-religion",
];
export const ALESBranchExams = [
  "ales-education",
  "ales-law",
  "ales-economy",
  "ales-engineering",
  "ales-medicine",
  "ales-architecture",
  "ales-agriculture",
  "ales-veterinary",
  "ales-forestry",
  "ales-fisheries",
  "ales-islam",
  "ales-philosophy",
];
export const YDSBranchExams = [
  "yds-education",
  "yds-law",
  "yds-economy",
  "yds-engineering",
  "yds-medicine",
  "yds-architecture",
  "yds-agriculture",
  "yds-veterinary",
  "yds-forestry",
  "yds-fisheries",
  "yds-islam",
  "yds-philosophy",
];
