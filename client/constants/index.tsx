import { TaskStatus } from "@/components/global/status-filter";
import { Views } from "react-big-calendar";

import {
  IoBarChartOutline,
  IoBookOutline,
  IoCalendarOutline,
  IoGridOutline,
  IoRocketOutline,
  IoSettingsOutline,
  IoTimeOutline,
} from "react-icons/io5";

export const menuLinks = [
  {
    label: "Panel",
    href: "/dashboard",
    icon: <IoGridOutline size={18} />,
  },
  {
    label: "Planlama",
    href: "/dashboard/planning",
    icon: <IoCalendarOutline size={18} />,
  },
  {
    label: "Odaklanma",
    href: "/dashboard/focusing",
    icon: <IoTimeOutline size={18} />,
  },
  {
    label: "Dersler",
    href: "/dashboard/courses",
    icon: <IoBookOutline size={18} />,
  },
  {
    label: "Hesaplama",
    href: "/dashboard/calculation",
    icon: <IoRocketOutline size={18} />,
  },
  {
    label: "İstatistik",
    href: "/dashboard/stats",
    icon: <IoBarChartOutline size={18} />,
  },
  {
    label: "Ayarlar",
    href: "/dashboard/settings",
    icon: <IoSettingsOutline size={18} />,
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
