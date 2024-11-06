'use client';

import { useModal } from '@/providers/modal-provider';
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import Modal from '@/components/global/modal';
import FocusSessionForm from '../forms/focus-session-form';

const AddFocusItem = () => {
  const { setOpen } = useModal();

  return (
    <Button
      onClick={() =>
        setOpen(
          <Modal title='Odaklanma oturumu ekle'>
            <FocusSessionForm />
          </Modal>
        )
      }
    >
      <Plus size={18} />
      Ekle
    </Button>
  );
};

export default AddFocusItem;
