import FocusTimerForm from "@/components/forms/focus-timer-form";
import PageHeader from "@/components/global/page-header";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import React from "react";
import Statistics from "./_components/stats";
import FocusingHistory from "./_components/focusing-history";
import Goals from "./_components/goals";
import { Disc, TrendingUp } from "lucide-react";

const Focusing = () => {
  return (
    <>
      <PageHeader title="Odaklanma" />
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold">Odaklanma Zamanlayıcısı</h2>
          </CardHeader>
          <CardContent>
            <FocusTimerForm />
          </CardContent>
        </Card>
        <Card className="flex flex-col justify-between">
          <CardHeader>
            <h3 className="header-3 flex items-center gap-3">
              <div className="border rounded-md p-1.5">
                <TrendingUp size={22} className="text-muted-foreground" />
              </div>
              Odaklanma İstatistikleri
            </h3>
          </CardHeader>
          <Statistics />
        </Card>
        <Card className="flex flex-col justify-between">
          <CardHeader>
            <h3 className="header-3 flex items-center gap-3">
              <div className="border rounded-md p-1.5">
                <Disc size={22} className="text-muted-foreground" />
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
