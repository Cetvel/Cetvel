"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { GoalSchema } from "@/lib/schemas";
import { z } from "zod";
import { Form } from "../ui/form";
import CustomFormField, { FormFieldType } from "../ui/custom-form-field";
import SubmitButton from "./ui/submit-button";
import { GoalTypeOptions, GoalUnitOptions } from "@/constants";
import { SelectItem } from "../ui/select";

const GoalForm = () => {
  const form = useForm<z.infer<typeof GoalSchema>>({
    resolver: zodResolver(GoalSchema),
    defaultValues: {
      title: "",
      related: "",
      startsAt: new Date(),
      target: 0,
      type: "Günlük",
      unit: "Saat",
    },
  });

  const [loading, setLoading] = useState<boolean>(false);

  async function onSubmit(values: z.infer<typeof GoalSchema>) {
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
          label="Hedef başlığı"
        />

        <div className="grid xl:grid-cols-2 gap-4">
          <CustomFormField
            fieldType={FormFieldType.SELECT}
            control={form.control}
            name="type"
            label="Hedef tipi"
          >
            {GoalTypeOptions.map((option, id) => (
              <SelectItem key={id} value={option}>
                {option}
              </SelectItem>
            ))}
          </CustomFormField>

          <CustomFormField
            fieldType={FormFieldType.SELECT}
            control={form.control}
            name="unit"
            label="Hedef birimi"
          >
            {GoalUnitOptions.map((option, id) => (
              <SelectItem key={id} value={option}>
                {option}
              </SelectItem>
            ))}
          </CustomFormField>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <CustomFormField
            fieldType={FormFieldType.NUMBER}
            control={form.control}
            name="target"
            label="Hedef miktarı"
          />

          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="related"
            placeholder="İlgili etiket"
            label="İlgili Konu/Ders"
          />
        </div>

        <SubmitButton text="Ekle" loading={loading} />
      </form>
    </Form>
  );
};

export default GoalForm;
