"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PomodoroSchema } from "@/lib/schemas";
import { z } from "zod";
import { Form } from "../ui/form";
import CustomFormField, { FormFieldType } from "../ui/custom-form-field";
import SubmitButton from "./ui/submit-button";
import { SelectItem } from "../ui/select";
import { LoaderCircle } from "lucide-react";
import useSWR from "swr";
import { fetcher } from "@/lib/utils";
import { createPomodoro } from "@/lib/services/pomodoro-service";
import { useModal } from "@/providers/modal-provider";

const PomodoroForm = () => {
  const { setClose } = useModal();
  const {
    data: tags,
    isLoading: isTagsLoading,
    error: tagsError,
  } = useSWR<Tag[]>("/tag", fetcher);
  const form = useForm<z.infer<typeof PomodoroSchema>>({
    resolver: zodResolver(PomodoroSchema),
    defaultValues: {
      title: "",
      tag: "",
      duration: "0",
      date: new Date(),
    },
  });

  const [loading, setLoading] = useState<boolean>(false);

  async function onSubmit(values: z.infer<typeof PomodoroSchema>) {
    setLoading(true);

    const data = {
      title: values.title,
      tag: values.tag,
      duration: values.duration,
      startsAt: values.date,
      endsAt: new Date(values.date).setMinutes(
        new Date(values.date).getMinutes() + Number(values.duration)
      ),
    };

    const success = await createPomodoro(data);

    if (success) {
      form.reset();
      setClose();
    }

    setLoading(false);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="title"
            placeholder="Başlık ekleyin"
            label="Pomodoro başlığı"
          />

          <CustomFormField
            fieldType={FormFieldType.SELECT}
            control={form.control}
            name="tag"
            label="Etiket"
            placeholder="Etiket seçin"
          >
            {tags ? (
              tags.map((tag: any, i: number) => (
                <SelectItem key={i} value={tag.value}>
                  {tag.label}
                </SelectItem>
              ))
            ) : isTagsLoading ? (
              <SelectItem value="loading" disabled>
                <LoaderCircle size={16} className="animate-spin" />
              </SelectItem>
            ) : !tagsError ? (
              <SelectItem value="empty" disabled>
                Etiket yok
              </SelectItem>
            ) : tagsError ? (
              <SelectItem value="error" disabled>
                Etiketler yüklenemedi
              </SelectItem>
            ) : null}
          </CustomFormField>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
          <CustomFormField
            fieldType={FormFieldType.NUMBER}
            control={form.control}
            name="duration"
            placeholder="Dakika cinsinden"
            label="Pomodoro süresi (dakika)"
          />

          <CustomFormField
            fieldType={FormFieldType.DATE_PICKER}
            control={form.control}
            name="date"
            label="Tarih"
            placeholder="Tarih seçin"
          />
        </div>

        <SubmitButton text="Ekle" loading={loading} />
      </form>
    </Form>
  );
};

export default PomodoroForm;
