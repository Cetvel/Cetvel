import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { axiosInstance } from "@/lib/utils";
import { Trash } from "lucide-react";
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
    <div className="flex items-center p-1 pl-4 rounded-xl justify-between border-card">
      <h4>{label}</h4>
      <Button variant={"ghost"} size={"icon-sm"} onClick={handleDelete}>
        <Trash />
      </Button>
    </div>
  );
};

export default Tag;
