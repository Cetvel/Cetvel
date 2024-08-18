import {
  BarChart,
  Book,
  Calendar,
  LayoutGrid,
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
  { value: "active", label: "Aktif" },
  { value: "completed", label: "Tamamlandı" },
];

export const StudyFieldOptions = ["YKS", "LGS", "KPSS"];

export const GoalUnitOptions = ["Saat", "Dakika", "Sayı", "Konu sayısı"];
export const GoalTypeOptions = ["Günlük", "Haftalık", "Aylık"];
