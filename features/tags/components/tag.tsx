import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { axiosInstance } from '@/lib/utils';
import { Ellipsis, Palette, Pencil, Trash } from 'lucide-react';
import React from 'react';
import { toast } from 'sonner';
import { mutate } from 'swr';

const Tag = ({ _id, label }: Partial<Tag>) => {
  const handleDelete = async () => {
    toast(label, {
      description: 'Etiket siliniyor...',
    });

    try {
      const res = await axiosInstance.delete(`/tag/${_id}`);

      if (res.status === 200) {
        toast.success(label, {
          description: 'Etiket silindi',
        });
        mutate('/tag');
      }
    } catch (error) {
      toast.error(label, {
        description: 'Bir hata oluştu',
      });
      console.error(error);
    }
  };

  return (
    <div className='flex items-center p-1 pl-4 rounded-xl justify-between border'>
      <h4>{label}</h4>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='ghost' size='icon-sm'>
            <span className='sr-only'>Menü</span>
            <Ellipsis size={14} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DropdownMenuItem
            className='text-destructive flex items-center gap-2'
            onClick={handleDelete}
          >
            <Trash size={16} />
            Sil
          </DropdownMenuItem>
          <DropdownMenuItem className='flex items-center gap-2'>
            <Pencil size={14} />
            Düzenle
          </DropdownMenuItem>
          <DropdownMenuItem className='flex items-center gap-2'>
            <Palette size={14} />
            Renk Değiştir
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default Tag;
