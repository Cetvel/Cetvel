import React from "react";
import { Combobox } from "../ui/combobox";
import { useTags } from "@/hooks/use-tags";

type Props = {
  onChange: (value: string) => void;
};

const TagFilter = ({ onChange }: Props) => {
  const { tags, loading, error } = useTags();

  if (loading) {
    return <div>Yükleniyor...</div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  /* return (
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
  ); */

  return <p>Tag filtresi</p>;
};

export default TagFilter;
