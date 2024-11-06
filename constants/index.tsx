import {
  BarChart,
  LayoutGrid,
  Logs,
  Rocket,
  Settings,
  Timer,
} from 'lucide-react';
import { Views } from 'react-big-calendar';

export const menuLinks = [
  {
    label: 'Panel',
    href: '/dashboard',
    icon: <LayoutGrid size={18} />,
  },

  {
    label: 'Görevler',
    href: '/dashboard/tasks',
    icon: <Logs size={18} />,
  },
  {
    label: 'Odaklanma',
    href: '/dashboard/focusing',
    icon: <Timer size={18} />,
  },
  {
    label: 'Hesaplama',
    href: '/dashboard/calculation',
    icon: <Rocket size={18} />,
  },
  {
    label: 'İstatistik',
    href: '/dashboard/stats',
    icon: <BarChart size={18} />,
  },
  {
    label: 'Ayarlar',
    href: '/dashboard/settings',
    icon: <Settings size={18} />,
  },
];

export const VIEW_OPTIONS = [
  { id: Views.DAY, label: 'Day' },
  { id: Views.WEEK, label: 'Week' },
  { id: Views.MONTH, label: 'Month' },
];
