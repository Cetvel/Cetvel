"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import CustomFormField, { FormFieldType } from "../ui/custom-form-field";
import { Form } from "../ui/form";
import { SelectItem } from "../ui/select";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader } from "../ui/card";
import FormError from "./ui/form-error";
import SubmitButton from "./ui/submit-button";

type SubjectConfig = {
  name: string;
  label: string;
  maxQuestions: number;
};

type FieldConfig = {
  name: string;
  label: string;
  options: string[];
};

type ExamConfig = {
  type: string;
  label: string;
  fields?: FieldConfig[];
  subjects: SubjectConfig[];
  totalTime?: number;
};

const examConfigs: ExamConfig[] = [
  {
    type: "TYT",
    label: "Temel Yeterlilik Testi",
    subjects: [
      { name: "turkish", label: "Türkçe", maxQuestions: 40 },
      { name: "math", label: "Matematik", maxQuestions: 40 },
      { name: "social", label: "Sosyal Bilimler", maxQuestions: 20 },
      { name: "science", label: "Fen Bilimleri", maxQuestions: 20 },
    ],
    totalTime: 135,
  },
  {
    type: "AYT",
    label: "Alan Yeterlilik Testi",
    fields: [
      {
        name: "field",
        label: "Alan",
        options: ["Sayısal", "Sözel", "Eşit Ağırlık", "Dil"],
      },
    ],
    subjects: [
      { name: "turkish", label: "Türk Dili ve Edebiyatı", maxQuestions: 24 },
      { name: "math", label: "Matematik", maxQuestions: 40 },
      { name: "social", label: "Sosyal Bilimler", maxQuestions: 10 },
      { name: "science", label: "Fen Bilimleri", maxQuestions: 13 },
    ],
    totalTime: 180,
  },
];

const createDynamicSchema = (config: ExamConfig) => {
  const subjectSchema = (maxQuestions: number) =>
    z
      .object({
        solvingTime: z.coerce
          .number()
          .min(0)
          .max(config.totalTime || 180)
          .optional(),
        correct: z.coerce.number().min(0).max(maxQuestions),
        wrong: z.coerce.number().min(0).max(maxQuestions),
      })
      .refine((data) => data.correct + data.wrong <= maxQuestions, {
        message: `Toplam soru sayısı ${maxQuestions}'i geçemez.`,
      });

  const schemaFields: Record<string, z.ZodTypeAny> = {
    examType: z.enum(
      examConfigs.map((config) => config.type) as [string, ...string[]]
    ),
    examName: z.string().min(1, "Sınav adı gereklidir."),
    solvingTime: z.coerce
      .number()
      .min(0)
      .max(config.totalTime || 180)
      .optional(),
  };

  config.fields?.forEach((field) => {
    schemaFields[field.name] = z.enum(field.options as [string, ...string[]]);
  });

  config.subjects.forEach((subject) => {
    schemaFields[subject.name] = subjectSchema(subject.maxQuestions);
  });

  return z.object(schemaFields);
};

// Ders bileşeni
const SubjectField: React.FC<SubjectConfig & { control: any }> = ({
  control,
  name,
  maxQuestions,
  label,
}) => (
  <Card>
    <CardHeader>
      <h3 className="font-semibold">{label}</h3>
    </CardHeader>
    <CardContent>
      <div className="grid grid-cols-3 gap-4">
        <CustomFormField
          fieldType={FormFieldType.NUMBER}
          control={control}
          name={`${name}.solvingTime`}
          label="Çözüm Süresi (dk)"
          min={0}
          max={180}
        />
        <CustomFormField
          fieldType={FormFieldType.NUMBER}
          control={control}
          name={`${name}.correct`}
          label="Doğru"
          min={0}
          max={maxQuestions}
        />
        <CustomFormField
          fieldType={FormFieldType.NUMBER}
          control={control}
          name={`${name}.wrong`}
          label="Yanlış"
          min={0}
          max={maxQuestions}
        />
      </div>
    </CardContent>
  </Card>
);

const ModularExamForm: React.FC = () => {
  const [selectedExamType, setSelectedExamType] = useState<string>(
    examConfigs[0].type
  );
  const [currentConfig, setCurrentConfig] = useState<ExamConfig>(
    examConfigs[0]
  );
  const [schema, setSchema] = useState(createDynamicSchema(currentConfig));

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {} as z.infer<typeof schema>,
  });

  useEffect(() => {
    const newConfig =
      examConfigs.find((config) => config.type === selectedExamType) ||
      examConfigs[0];
    setCurrentConfig(newConfig);
    const newSchema = createDynamicSchema(newConfig);
    setSchema(newSchema);

    const defaultValues: any = {
      examType: newConfig.type,
      examName: "",
      solvingTime: newConfig.totalTime,
    };

    newConfig.fields?.forEach((field) => {
      defaultValues[field.name] = field.options[0];
    });

    newConfig.subjects.forEach((subject) => {
      defaultValues[subject.name] = {
        solvingTime: 0,
        correct: 0,
        wrong: 0,
        empty: 0,
      };
    });

    form.reset({
      ...defaultValues,
      examType: newConfig.type,
    });
  }, [selectedExamType, form]);

  const onSubmit = (data: z.infer<typeof schema>) => {
    console.log(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormError
          title={"Formda eksik veya hatalı alanlar var. Lütfen kontrol edin."}
          description={form.formState.errors.root?.message}
        />

        <Card>
          <CardHeader>
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
              <CustomFormField
                fieldType={FormFieldType.SELECT}
                control={form.control}
                name="examType"
                label="Sınav Türü"
                onValueChange={(value: string) => {
                  form.setValue("examType", value);
                  setSelectedExamType(value);
                }}
              >
                {examConfigs.map((config) => (
                  <SelectItem key={config.type} value={config.type}>
                    {config.label}
                  </SelectItem>
                ))}
              </CustomFormField>

              {currentConfig.fields?.map((field) => (
                <CustomFormField
                  key={field.name}
                  fieldType={FormFieldType.SELECT}
                  control={form.control}
                  name={field.name}
                  label={field.label}
                >
                  {field.options.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </CustomFormField>
              ))}

              <CustomFormField
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name="examName"
                label="Sınav Adı"
              />

              <CustomFormField
                fieldType={FormFieldType.NUMBER}
                control={form.control}
                name="solvingTime"
                label="Toplam Çözüm Süresi (dk)"
                min={0}
                max={currentConfig.totalTime || 180}
              />
            </div>
          </CardHeader>
        </Card>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {currentConfig.subjects.map((subject) => (
            <SubjectField
              key={subject.name}
              control={form.control}
              {...subject}
            />
          ))}
        </div>

        <SubmitButton
          additionalButtons={[
            ({ loading }) => ({
              button: (
                <Button
                  type="button"
                  disabled={loading}
                  variant="destructive"
                  onClick={form.reset}
                >
                  Sıfırla
                </Button>
              ),
            }),
          ]}
          text="Sınavı Kaydet"
        />
      </form>
    </Form>
  );
};

export default ModularExamForm;
