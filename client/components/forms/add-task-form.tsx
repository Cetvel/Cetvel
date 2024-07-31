"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { TaskSchema } from "@/lib/schemas";
import { z } from "zod";
import { instance } from "@/lib/utils";
import { Form } from "../ui/form";
import CustomFormField, { FormFieldType } from "../ui/custom-form-field";
import FormError from "./ui/form-error";
import FormSuccess from "./ui/form-success";
import SubmitButton from "./ui/submit-button";
import { useTags } from "@/hooks/use-tags";
import { SelectItem } from "../ui/select";

const AddTaskForm = () => {
  const { tags } = useTags();

  const form = useForm<z.infer<typeof TaskSchema>>({
    resolver: zodResolver(TaskSchema),
    defaultValues: {
      title: "",
      list: "",
    },
  });

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  async function onSubmit(values: z.infer<typeof TaskSchema>) {
    setError(null);
    setSuccess(null);
    setLoading(true);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="title"
          placeholder="Başlık ekleyin"
        />

        <CustomFormField
          fieldType={FormFieldType.SELECT}
          control={form.control}
          name="tag"
          placeholder="Etiket seçin"
        >
          {tags.map((tag: any, i: number) => (
            <SelectItem key={i} value={tag.value}>
              {tag.label}
            </SelectItem>
          ))}
        </CustomFormField>

        <FormError title={"Hata"} description={error} />
        <FormSuccess title={"Başarılı"} description={success} />
        <SubmitButton text="Görev ekle" className="ml-auto" loading={loading} />
      </form>
    </Form>
  );
};

export default AddTaskForm;
