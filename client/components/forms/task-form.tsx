"use client";

import { useState, useEffect, useRef } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TaskSchema } from "@/lib/schemas";
import { z } from "zod";
import { Form } from "../ui/form";
import CustomFormField, { FormFieldType } from "../ui/custom-form-field";
import SubmitButton from "./ui/submit-button";
import { useTags } from "@/hooks/use-tags";
import { SelectItem } from "../ui/select";
import isEqual from "lodash/isEqual";

type TaskFormProps = {
  type?: "edit" | "create";
  task?: Task;
};

const TaskForm = ({ type = "create", task }: TaskFormProps) => {
  const { tags } = useTags();
  const [loading, setLoading] = useState<boolean>(false);
  const [isFormChanged, setIsFormChanged] = useState<boolean>(false);

  const defaultValues = {
    title: task?.title || "",
    tag: task?.tag || "",
    startsAt: task?.startsAt || undefined,
    endsAt: task?.endsAt || undefined,
    reminder: task?.reminder || undefined,
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
    // Form gönderme işlemleri
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
            name="startAt"
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
          fieldType={FormFieldType.DATE_PICKER}
          control={form.control}
          name="reminder"
          label="Hatırlatma tarihi"
          placeholder="Hatırlatma tarihi (opsiyonel)"
        />

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
          <SubmitButton
            disabled={!isFormChanged}
            text="Güncelle"
            loading={loading}
          />
        )}
        {type === "create" && <SubmitButton text="Oluştur" loading={loading} />}
      </form>
    </Form>
  );
};

export default TaskForm;
