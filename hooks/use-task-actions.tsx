// hooks/useTaskActions.ts
import { useCallback } from "react";
import { deleteTask, toggleTaskComplete } from "@/lib/services/task-service";
import { CheckCircle, XCircle, Pencil, Trash } from "lucide-react";
import { useModal } from "@/providers/modal-provider";
import TaskForm from "@/components/forms/task-form";
import Modal from "@/components/global/modal";

export const useTaskActions = (task: Task): Action[] => {
  const { setOpen } = useModal();

  const handleToggleComplete = useCallback(() => {
    toggleTaskComplete(task);
  }, [task]);

  const handleEdit = useCallback(() => {
    setOpen(
      <Modal title="Görevi düzenle">
        <TaskForm task={task} type="edit" />
      </Modal>
    );
  }, [setOpen, task]);

  const handleDelete = useCallback(() => {
    deleteTask(task._id);
  }, [task._id]);

  return [
    {
      icon:
        task.status === "incomplete" ? (
          <CheckCircle size={14} />
        ) : (
          <XCircle size={14} />
        ),
      label: task.status === "incomplete" ? "Tamamla" : "İptal Et",
      onClick: handleToggleComplete,
    },
    {
      icon: <Pencil size={14} />,
      label: "Düzenle",
      onClick: handleEdit,
    },
    {
      icon: <Trash size={14} />,
      label: "Sil",
      onClick: handleDelete,
      variant: "destructive",
      alert: true,
    },
  ];
};
