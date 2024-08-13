import React from "react";
import { taskStatusses } from "@/constants";
import { Combobox } from "../ui/combobox";

type Props = {
  onChange: (value: string) => void;
};

const StatusFilter = ({ onChange }: Props) => {
  return (
    <Combobox
      className="w-[150px]"
      itemValue={taskStatusses[0].value}
      onChange={onChange}
      items={taskStatusses}
      selectText="Tüm durumlar"
    />
  );
};

export default StatusFilter;
