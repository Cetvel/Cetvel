import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import React from "react";
import { FocusingStatsChart } from "./stats-chart";
import { TrendingUp } from "lucide-react";

const Statistics = () => {
  return (
    <Card className="flex flex-col justify-between">
      <CardHeader>
        <h3 className="header-3 flex items-center gap-3">
          <span className="text-primary">
            <TrendingUp size={30} />
          </span>
          Odaklanma İstatistikleri
        </h3>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <p>Bugünkü toplam:</p>
          <p>1 saat 30 dakika</p>
        </div>
        <div className="flex items-center justify-between">
          <p>Haftalık ortalama:</p>
          <p>1 saat 30 dakika</p>
        </div>
        <div className="flex items-center justify-between">
          <p>En verimli saat:</p>
          <p>14:00</p>
        </div>
        <div className="flex items-center justify-between">
          <p>Toplam oturum:</p>
          <p>12</p>
        </div>
      </CardContent>

      <CardFooter>
        <FocusingStatsChart />
      </CardFooter>
    </Card>
  );
};

export default Statistics;
