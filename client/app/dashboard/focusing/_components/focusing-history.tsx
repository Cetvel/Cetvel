import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { IoTimerOutline } from "react-icons/io5";
import FocusItemsTable from "./focus-items-table";

const FocusingHistory = () => {
  return (
    <Card className="mt-6">
      <CardHeader>
        <h3 className="flex items-center gap-3 header-3">
          <span className="text-primary-500">
            <IoTimerOutline size={30} />
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
