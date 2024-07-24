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
    icon: <IoGridOutline className="w-5 h-5" />,
  },
  {
    label: "Planlama",
    href: "/dashboard/planning",
    icon: <IoCalendarOutline className="w-5 h-5" />,
  },
  {
    label: "Zamanlama",
    href: "/dashboard/timing",
    icon: <IoTimeOutline className="w-5 h-5" />,
  },
  {
    label: "Dersler",
    href: "/dashboard/courses",
    icon: <IoBookOutline className="w-5 h-5" />,
  },
  {
    label: "Hesaplama",
    href: "/dashboard/calculation",
    icon: <IoRocketOutline className="w-5 h-5" />,
  },
  {
    label: "İstatistik",
    href: "/dashboard/stats",
    icon: <IoBarChartOutline className="w-5 h-5" />,
  },
  {
    label: "Ayarlar",
    href: "/dashboard/settings",
    icon: <IoSettingsOutline className="w-5 h-5" />,
  },
];
