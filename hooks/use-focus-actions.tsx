import { useCallback } from 'react';
import {
  deleteFocusSession,
  updateFocusSession,
} from '@/lib/services/focus-service';
import { Repeat, Pencil, Trash } from 'lucide-react';
import { useModal } from '@/providers/modal-provider';
import FocusSessionForm from '@/components/forms/focus-session-form';
import Modal from '@/components/global/modal';

export const useFocusActions = (focusSession: Focus): Action[] => {
  const { setOpen } = useModal();

  const handleEdit = useCallback(() => {
    setOpen(
      <Modal title='Odak oturumunu düzenle'>
        <FocusSessionForm editSession={focusSession} />
      </Modal>
    );
  }, [setOpen, focusSession]);

  const handleDelete = useCallback(() => {
    deleteFocusSession(focusSession._id);
  }, [focusSession._id]);

  return [
    {
      icon: <Pencil size={14} />,
      label: 'Düzenle',
      onClick: handleEdit,
    },
    {
      icon: <Trash size={14} />,
      label: 'Sil',
      onClick: handleDelete,
      variant: 'destructive',
      alert: true,
    },
  ];
};
