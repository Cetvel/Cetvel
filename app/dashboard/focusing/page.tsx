import FocusTimerForm from "@/components/forms/focus-timer-form";
import PageHeader from "@/components/global/page-header";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import React from "react";
import Statistics from "./_components/stats";
import FocusingHistory from "./_components/focusing-history";
import Goals from "./_components/goals";

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
        <Statistics />
        <Goals />
      </div>
      <FocusingHistory />
    </>
  );
};

export default Focusing;
