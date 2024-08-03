import { Card, CardContent, CardHeader } from "@/components/ui/card";
import React from "react";

const DailyOverview = () => {
  return (
    <Card className="z-20 lg:col-span-2 h-full">
      <CardHeader>
        <h3 className="header-3">Günlük Özet</h3>
      </CardHeader>
      <CardContent>Tamamlanan görevler: 3/5</CardContent>
      <CardContent>Toplam çalışma süresi: 2 saat 30 dakika</CardContent>
    </Card>
  );
};

export default DailyOverview;
