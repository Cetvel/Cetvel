import { useTags } from "@/hooks/use-tags";
import React from "react";
import { Combobox } from "../ui/combobox";

type Props = {
  onChange: (value: string) => void;
};

const TagFilter = ({ onChange }: Props) => {
  const { tags } = useTags();

  return (
    <Combobox
      className={"w-[120px]"}
      itemValue={tags[0].value}
      onChange={onChange}
      items={tags}
      searchText="Etiket Ara..."
      emptyText="Etiket bulunamadı."
      selectText="Etiket"
      searchable
    />
  );
};

export default TagFilter;
