import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";
import { axiosInstance } from "@/lib/utils";
import { Ellipsis, Palette, Pencil, Trash } from "lucide-react";
import React from "react";
import { mutate } from "swr";

const Tag = ({ _id, label }: Partial<Tag>) => {
  const { toast } = useToast();

  const handleDelete = async () => {
    toast({
      title: label,
      description: "Etiket siliniyor...",
    });

    try {
      const res = await axiosInstance.delete(`/tag/${_id}`);

      if (res.status === 200) {
        toast({
          title: label,
          description: "Etiket silindi",
        });
        mutate("/tag");
      }
    } catch (error) {
      toast({
        title: label,
        description: "Bir hata oluştu",
        variant: "destructive",
      });
      console.error(error);
    }
  };

  return (
    <div className="flex items-center p-1 pl-4 rounded-xl justify-between border">
      <h4>{label}</h4>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon-sm">
            <span className="sr-only">Menü</span>
            <Ellipsis size={14} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            className="text-destructive flex items-center gap-2"
            onClick={handleDelete}
          >
            <Trash size={16} />
            Sil
          </DropdownMenuItem>
          <DropdownMenuItem className="flex items-center gap-2">
            <Pencil size={14} />
            Düzenle
          </DropdownMenuItem>
          <DropdownMenuItem className="flex items-center gap-2">
            <Palette size={14} />
            Renk Değiştir
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default Tag;
