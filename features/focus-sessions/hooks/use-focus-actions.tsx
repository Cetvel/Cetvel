import { useCallback } from 'react';
import { deleteFocusSession } from '@/features/focus-sessions/actions';
import { Pencil, Trash } from 'lucide-react';
import { useModal } from '@/providers/modal-provider';
import FocusSessionForm from '@/features/focus-sessions/forms/focus-session-form';
import Modal from '@/components/global/modal';
import { Action } from '@/types';

export const GetFocusActions = (focusSession: FocusSession): Action[] => {
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
