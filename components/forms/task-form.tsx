"use client";

import { useState, useEffect, useRef } from "react";
import { useForm, useWatch } from "react-hook-form";
import { mutate } from "swr";
import { zodResolver } from "@hookform/resolvers/zod";
import { TaskSchema } from "@/lib/schemas";
import { z } from "zod";
import { Form } from "../ui/form";
import CustomFormField, { FormFieldType } from "../ui/custom-form-field";
import SubmitButton from "./ui/submit-button";
import { useTags } from "@/hooks/use-tags";
import { SelectItem } from "../ui/select";
import isEqual from "lodash/isEqual";
import { axiosInstance } from "@/lib/utils";
import { useToast } from "../ui/use-toast";
import { Button } from "../ui/button";
import { useModal } from "@/providers/modal-provider";

type TaskFormProps = {
  type?: "edit" | "create";
  task?: Task;
};

const TaskForm = ({ type = "create", task }: TaskFormProps) => {
  const { tags } = useTags();
  const { setClose } = useModal();
  const [loading, setLoading] = useState<boolean>(false);
  const { toast } = useToast();
  const [isFormChanged, setIsFormChanged] = useState<boolean>(false);

  const defaultValues = {
    title: task?.title || "",
    tag: task?.tag || "",
    startsAt: task?.startsAt || undefined,
    endsAt: task?.endsAt || undefined,
  };

  const form = useForm<z.infer<typeof TaskSchema>>({
    resolver: zodResolver(TaskSchema),
    defaultValues,
  });

  const originalData = useRef(defaultValues);
  const formValues = useWatch({ control: form.control });

  useEffect(() => {
    if (type === "edit") {
      const changed = !isEqual(formValues, originalData.current);
      setIsFormChanged(changed);
    }
  }, [formValues, type]);

  async function onSubmit(values: z.infer<typeof TaskSchema>) {
    setLoading(true);

    toast({
      title: values.title,
      description:
        type === "create" ? "Görev oluşturuluyor..." : "Görev güncelleniyor...",
    });

    if (type === "create") {
      try {
        const res = await axiosInstance.post("/todo", values);

        if (res.status === 201) {
          form.reset();
          toast({
            title: "Görev oluşturuldu",
            description: "Görev başarıyla oluşturuldu.",
          });
          mutate(`/todo/today`);
          setClose();
        }
      } catch (error) {
        toast({
          title: "Görev oluşturulamadı",
          description: "Görev oluşturulurken bir hata oluştu.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    } else {
      try {
        const res = await axiosInstance.put(`/todo/${task?._id}`, values);

        if (res) {
          toast({
            title: "Görev güncellendi",
            description: "Görev başarıyla güncellendi.",
          });
          mutate(`/todo/today`);
          setClose();
        }
      } catch (error) {
        toast({
          title: "Görev güncellenemedi",
          description: "Görev güncellenirken bir hata oluştu.",
          variant: "destructive",
        });
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
  }

  async function onDelete() {
    setLoading(true);

    try {
      const res = await axiosInstance.delete(`/todo/${task?._id}`);

      if (res.status === 200) {
        toast({
          title: "Görev silindi",
          description: "Görev başarıyla silindi.",
        });
        mutate(`/todo/today`);
        setClose();
      }
    } catch (error) {
      toast({
        title: "Görev silinemedi",
        description: "Görev silinirken bir hata oluştu.",
      });
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="title"
          label="Başlık"
          placeholder="Başlık ekleyin"
        />

        <div className="grid grid-cols-2 gap-2">
          <CustomFormField
            fieldType={FormFieldType.DATE_PICKER}
            control={form.control}
            name="startsAt"
            label="Başlangıç"
            placeholder="Tarih seçin"
          />

          <CustomFormField
            fieldType={FormFieldType.DATE_PICKER}
            control={form.control}
            name="endsAt"
            label="Bitiş"
            placeholder="Tarih seçin"
          />
        </div>

        <CustomFormField
          fieldType={FormFieldType.SELECT}
          control={form.control}
          name="tag"
          label="Etiket"
          placeholder="Etiket seçin"
        >
          {tags.map((tag: any, i: number) => (
            <SelectItem key={i} value={tag.value}>
              {tag.label}
            </SelectItem>
          ))}
        </CustomFormField>

        {type === "edit" && (
          <div className="flex items-center justify-end gap-2">
            <Button type="button" variant={"destructive"} onClick={onDelete}>
              Sil
            </Button>
            <SubmitButton
              disabled={!isFormChanged}
              text="Güncelle"
              loading={loading}
            />
          </div>
        )}
        {type === "create" && <SubmitButton text="Oluştur" loading={loading} />}
      </form>
    </Form>
  );
};

export default TaskForm;
