import React from "react";
import { Combobox } from "../ui/combobox";
import { taskStatusses } from "@/constants";

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
      selectText="Tümü"
    />
  );
};

export default StatusFilter;
