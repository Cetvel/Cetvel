/* import AddListForm from "@/components/forms/add-list-form"; */
import React from "react";
/* import List from "@/components/ui/tag";
import Modal from "@/components/ui/modal"; */
import { IoDocumentTextOutline } from "react-icons/io5";
import { useModal } from "@/providers/modal-provider";
import { Button } from "@/components/ui/button";
/* import { useLists } from "@/hooks/use-lists"; */

const ListManager = () => {
  const { setOpen } = useModal();
  /* const { lists } = useLists(); */

  return (
    <>
      <Button
        /* onClick={() =>
          setOpen(
            <Modal title="Listeler">
              <div className="modal-top mb-4">
                <AddListForm />
              </div>

              <h4 className="text-lg pl-2">Tüm Listeler</h4>
              {lists?.map((tag: any) => (
                <List key={tag.value} id={tag.id} title={tag.label} />
              ))}
            </Modal>
          )
        } */
        variant="outline"
        size="icon"
        className="p-2"
      >
        <IoDocumentTextOutline size={16} />
      </Button>
    </>
  );
};

export default ListManager;
