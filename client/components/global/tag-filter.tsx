import { useTags } from "@/hooks/use-tags";
import React from "react";
import { Combobox } from "../ui/combobox";

type Props = {
  onChange: (value: string) => void;
};

const ListFilter = ({ onChange }: Props) => {
  const { tags } = useTags();

  return (
    <Combobox
      itemValue={tags[0].value}
      onChange={onChange}
      items={tags}
      searchText="Liste Ara..."
      emptyText="Liste bulunamadı."
      selectText="Filtrele..."
    />
  );
};

export default ListFilter;
