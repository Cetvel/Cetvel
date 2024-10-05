'use client';
import { useModal } from '@/providers/modal-provider';
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from '../ui/dialog';
import { DialogTitle } from '@radix-ui/react-dialog';

type Props = {
  title: string;
  subheading?: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  buttons?: React.ReactNode;
};

const Modal = ({
  children,
  defaultOpen,
  subheading,
  title,
  buttons,
}: Props) => {
  const { isOpen, setClose } = useModal();
  return (
    <Dialog open={isOpen || defaultOpen} onOpenChange={setClose}>
      <DialogContent
        className='overflow-y-auto
      
      
       shad-dialog'
      >
        <DialogHeader className='text-left'>
          <DialogTitle className='text-lg font-bold'>{title}</DialogTitle>
          <DialogDescription>{subheading}</DialogDescription>
          {buttons}
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
