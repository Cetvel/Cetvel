import { Card, CardContent, CardHeader } from "@/components/ui/card";
import FocusItemsTable from "./focus-items-table";
import { Timer } from "lucide-react";

const FocusingHistory = () => {
  return (
    <Card className="mt-6">
      <CardHeader>
        <h3 className="flex items-center gap-3 header-3">
          <span className="text-primary">
            <Timer size={30} />
          </span>
          Odaklanma geçmişi
        </h3>
      </CardHeader>
      <CardContent>
        <FocusItemsTable />
      </CardContent>
    </Card>
  );
};

export default FocusingHistory;
