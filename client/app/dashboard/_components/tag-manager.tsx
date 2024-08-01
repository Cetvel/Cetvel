import React from "react";
import { IoDocumentTextOutline } from "react-icons/io5";
import { useModal } from "@/providers/modal-provider";
import { Button } from "@/components/ui/button";
import Modal from "@/components/global/modal";
import { useTags } from "@/hooks/use-tags";
import Tag from "./tag";
import AddTagForm from "@/components/forms/add-tag-form";
import { DialogHeader } from "@/components/ui/dialog";

const TagManager = () => {
  const { setOpen } = useModal();
  const { tags } = useTags();

  return (
    <>
      <Button
        onClick={() =>
          setOpen(
            <Modal title="Etiketler">
              <DialogHeader>
                <AddTagForm />
              </DialogHeader>
              <h4 className="text-lg">Tüm etiketler</h4>
              {tags?.map((tag: any) => (
                <Tag key={tag.value} id={tag.id} title={tag.label} />
              ))}
            </Modal>
          )
        }
        variant="outline"
        size="icon-sm"
        className="p-2"
      >
        <IoDocumentTextOutline size={16} />
      </Button>
    </>
  );
};

export default TagManager;
