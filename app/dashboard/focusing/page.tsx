import FocusTimerForm from "@/components/forms/focus-timer-form";
import PageHeader from "@/components/global/page-header";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import React from "react";
import Statistics from "./_components/stats";
import FocusingHistory from "./_components/focusing-history";
import Goals from "./_components/goals";
import { Disc, Timer, TrendingUp } from "lucide-react";

const Focusing = () => {
  return (
    <>
      <PageHeader title="Odaklanma" />
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold flex items-center gap-3">
              <div className="border rounded-md p-1.5">
                <Timer size={18} className="text-muted-foreground" />
              </div>
              Odaklanma Zamanlayıcısı
            </h2>
          </CardHeader>
          <CardContent>
            <FocusTimerForm />
          </CardContent>
        </Card>
        <Card className="flex flex-col justify-between">
          <CardHeader>
            <h3 className="flex items-center gap-3">
              <div className="border rounded-md p-1.5">
                <TrendingUp size={18} className="text-muted-foreground" />
              </div>
              Odaklanma İstatistikleri
            </h3>
          </CardHeader>
          <Statistics />
        </Card>
        <Card className="flex flex-col justify-between">
          <CardHeader>
            <h3 className="flex items-center gap-3">
              <div className="border rounded-md p-1.5">
                <Disc size={18} className="text-muted-foreground" />
              </div>
              Hedefler
            </h3>
          </CardHeader>
          <Goals />
        </Card>
      </div>
      <FocusingHistory />
    </>
  );
};

export default Focusing;
