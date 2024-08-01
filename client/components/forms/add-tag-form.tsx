"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { ListSchema } from "@/lib/schemas";
import { z } from "zod";
import { instance } from "@/lib/utils";
import { Form } from "../ui/form";
import CustomFormField, { FormFieldType } from "../ui/custom-form-field";
import FormError from "./ui/form-error";
import FormSuccess from "./ui/form-success";
import SubmitButton from "./ui/submit-button";
import { useTags } from "@/hooks/use-tags";
import { SelectItem } from "../ui/select";

const AddTagForm = () => {
  const { tags } = useTags();

  const form = useForm<z.infer<typeof ListSchema>>({
    resolver: zodResolver(ListSchema),
    defaultValues: {
      title: "",
    },
  });

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  async function onSubmit(values: z.infer<typeof ListSchema>) {
    setError(null);
    setSuccess(null);
    setLoading(true);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex items-center space-x-2 flex-col sm:flex-row"
      >
        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="title"
          placeholder="Etiket adı"
        />

        <SubmitButton text="Ekle" className="ml-auto" loading={loading} />
      </form>
    </Form>
  );
};

export default AddTagForm;
