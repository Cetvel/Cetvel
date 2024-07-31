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
    label: "Zamanlama",
    href: "/dashboard/timing",
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

export const StudyFieldOptions = ["YKS", "LGS", "KPSS"];
