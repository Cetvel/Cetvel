import React from "react";
import { useModal } from "@/providers/modal-provider";
import { Button } from "@/components/ui/button";
import Modal from "@/components/global/modal";
import { useTags } from "@/hooks/use-tags";
import Tag from "./tag";
import AddTagForm from "@/components/forms/tag-form";
import { DialogHeader } from "@/components/ui/dialog";
import { TagIcon } from "lucide-react";

const TagManager = () => {
  const { setOpen } = useModal();
  const { tags, loading, error } = useTags();

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
              {loading && <p>Yükleniyor...</p>}
              {error && <p>{error.message}</p>}
              {tags?.length === 0 ? (
                <p>Etiket yok</p>
              ) : (
                tags?.map((tag: any) => (
                  <Tag key={tag.value} _id={tag._id} label={tag.label} />
                ))
              )}
            </Modal>
          )
        }
        variant="outline"
        size="icon-sm"
        className="p-2"
      >
        <TagIcon size={16} />
      </Button>
    </>
  );
};

export default TagManager;
