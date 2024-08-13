import { DataTable } from "@/components/global/data-table";
import React from "react";
import { columns } from "./columns";

const data = [
  {
    id: 1,
    description: "Haftalık ekip toplantısı",
    time: "09:00:00",
    date: new Date("2024-08-12"),
  },
  {
    id: 2,
    description: "Müşteri sunumu hazırlığı",
    time: "14:30:00",
    date: new Date("2024-08-13"),
  },
  {
    id: 3,
    description: "Proje deadline'ı",
    time: "18:00:00",
    date: new Date("2024-08-15"),
  },
  {
    id: 4,
    description: "Yeni çalışan oryantasyonu",
    time: "10:00:00",
    date: new Date("2024-08-16"),
  },
  {
    id: 5,
    description: "Bütçe planlama toplantısı",
    time: "11:30:00",
    date: new Date("2024-08-19"),
  },
  {
    id: 6,
    description: "Yazılım güncelleme",
    time: "22:00:00",
    date: new Date("2024-08-20"),
  },
  {
    id: 7,
    description: "Müşteri geri bildirim görüşmesi",
    time: "15:45:00",
    date: new Date("2024-08-21"),
  },
  {
    id: 8,
    description: "Çeyrek dönem performans değerlendirmesi",
    time: "13:00:00",
    date: new Date("2024-08-22"),
  },
  {
    id: 9,
    description: "Takım oluşturma etkinliği",
    time: "16:00:00",
    date: new Date("2024-08-23"),
  },
  {
    id: 10,
    description: "Ürün lansman hazırlığı",
    time: "09:30:00",
    date: new Date("2024-08-26"),
  },
  {
    id: 11,
    description: "IT altyapı bakımı",
    time: "23:00:00",
    date: new Date("2024-08-27"),
  },
  {
    id: 12,
    description: "Yıllık strateji toplantısı",
    time: "08:00:00",
    date: new Date("2024-08-28"),
  },
  {
    id: 13,
    description: "Proje ilerleme raporu sunumu",
    time: "14:00:00",
    date: new Date("2024-08-29"),
  },
  {
    id: 14,
    description: "İş güvenliği eğitimi",
    time: "10:30:00",
    date: new Date("2024-08-30"),
  },
  {
    id: 15,
    description: "Yeni ürün beyin fırtınası oturumu",
    time: "13:30:00",
    date: new Date("2024-09-02"),
  },
  {
    id: 16,
    description: "Satış ekibi koordinasyon toplantısı",
    time: "11:00:00",
    date: new Date("2024-09-03"),
  },
  {
    id: 17,
    description: "Şirket çapında duyuru",
    time: "16:30:00",
    date: new Date("2024-09-04"),
  },
  {
    id: 18,
    description: "Ar-Ge proje sunumu",
    time: "15:00:00",
    date: new Date("2024-09-05"),
  },
  {
    id: 19,
    description: "Çalışan memnuniyeti anketi son tarihi",
    time: "17:00:00",
    date: new Date("2024-09-06"),
  },
  {
    id: 20,
    description: "Ay sonu finansal kapanış",
    time: "18:30:00",
    date: new Date("2024-09-09"),
  },
];

const FocusItemsTable = () => {
  return (
    <DataTable columns={columns} data={data} searchableColumn="description" />
  );
};

export default FocusItemsTable;
