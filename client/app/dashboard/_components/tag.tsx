import { Button } from "@/components/ui/button";
import React from "react";
import { IoTrashBin } from "react-icons/io5";

interface ListItemProps {
  id: string;
  title: string;
}

const Tag = ({ id, title }: ListItemProps) => {
  const handleDelete = async () => {
    // TODO: delete tag
  };

  return (
    <div className="flex items-center p-1 pl-4 rounded-xl justify-between border-card">
      <h4>{title}</h4>
      <Button variant={"ghost"} size={"icon-sm"} onClick={handleDelete}>
        <IoTrashBin />
      </Button>
    </div>
  );
};

export default Tag;
