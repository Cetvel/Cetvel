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
import { createExam } from "@/lib/services/exam-service";
import Modal from "../global/modal";
import { DialogFooter } from "../ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { useModal } from "@/providers/modal-provider";

type SubjectConfig = {
  name: string;
  label: string;
  maxQuestions: number;
  forFields?: string[];
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

type ExamType = "tyt" | "ayt" | "lgs" | "dgs" | "yds" | "ales" | "kpss";
type AYTField = "say" | "ea" | "soz";

const examConfigs: ExamConfig[] = [
  {
    type: "tyt",
    label: "TYT (Temel Yeterlilik Testi)",
    subjects: [
      { name: "turkish", label: "Türkçe", maxQuestions: 40 },
      { name: "math", label: "Temel Matematik", maxQuestions: 40 },
      { name: "social", label: "Sosyal Bilimler", maxQuestions: 20 },
      { name: "science", label: "Fen Bilimleri", maxQuestions: 20 },
    ],
    totalTime: 135,
  },
  {
    type: "ayt",
    label: "AYT (Alan Yeterlilik Testi)",
    fields: [
      {
        name: "field",
        label: "Alan",
        options: ["say", "ea", "soz"],
      },
    ],
    subjects: [
      {
        name: "turkish",
        label: "Türk Dili ve Edebiyatı",
        maxQuestions: 24,
        forFields: ["ea", "soz"],
      },
      {
        name: "social1",
        label: "Tarih-1",
        maxQuestions: 10,
        forFields: ["ea", "soz"],
      },
      {
        name: "geography1",
        label: "Coğrafya-1",
        maxQuestions: 6,
        forFields: ["ea", "soz"],
      },
      {
        name: "math",
        label: "Matematik",
        maxQuestions: 40,
        forFields: ["say", "ea"],
      },
      { name: "physics", label: "Fizik", maxQuestions: 14, forFields: ["say"] },
      {
        name: "chemistry",
        label: "Kimya",
        maxQuestions: 13,
        forFields: ["say"],
      },
      {
        name: "biology",
        label: "Biyoloji",
        maxQuestions: 13,
        forFields: ["say"],
      },
      {
        name: "social2",
        label: "Tarih-2",
        maxQuestions: 11,
        forFields: ["soz"],
      },
      {
        name: "geography2",
        label: "Coğrafya-2",
        maxQuestions: 11,
        forFields: ["soz"],
      },
      {
        name: "philosophy",
        label: "Felsefe",
        maxQuestions: 12,
        forFields: ["ea", "soz"],
      },
      {
        name: "religion",
        label: "Din Kültürü",
        maxQuestions: 6,
        forFields: ["ea", "soz"],
      },
      {
        name: "language",
        label: "Yabancı Dil",
        maxQuestions: 80,
        forFields: ["dil"],
      },
    ],
    totalTime: 180,
  },
  {
    type: "lgs",
    label: "LGS (Liselere Geçiş Sınavı)",
    fields: [
      {
        name: "educationStyle",
        label: "Eğitim Stili",
        options: ["Din Kültürü ve Ahlak Bilgisi", "Yabancı Dil"],
      },
    ],
    subjects: [
      { name: "turkish", label: "Türkçe", maxQuestions: 20 },
      { name: "math", label: "Matematik", maxQuestions: 20 },
      { name: "science", label: "Fen Bilimleri", maxQuestions: 20 },
      {
        name: "revolution",
        label: "T.C. İnkılap Tarihi ve Atatürkçülük",
        maxQuestions: 10,
      },
      {
        name: "religion",
        label: "Din Kültürü ve Ahlak Bilgisi",
        maxQuestions: 10,
      },
      { name: "language", label: "Yabancı Dil", maxQuestions: 10 },
    ],
    totalTime: 120,
  },
  {
    type: "dgs",
    label: "DGS (Dikey Geçiş Sınavı)",
    subjects: [
      { name: "verbal", label: "Sözel Bölüm", maxQuestions: 60 },
      { name: "quantitative", label: "Sayısal Bölüm", maxQuestions: 60 },
    ],
    totalTime: 150,
  },
  {
    type: "yds",
    label: "YDS (Yabancı Dil Sınavı)",
    subjects: [{ name: "language", label: "Yabancı Dil", maxQuestions: 80 }],
    totalTime: 180,
  },
  {
    type: "ales",
    label: "ALES (Akademik Personel ve Lisansüstü Eğitimi Giriş Sınavı)",
    subjects: [
      { name: "verbal", label: "Sözel Bölüm", maxQuestions: 50 },
      { name: "quantitative", label: "Sayısal Bölüm", maxQuestions: 50 },
    ],
    totalTime: 150,
  },
  {
    type: "kpss",
    label: "KPSS (Kamu Personeli Seçme Sınavı)",
    fields: [
      {
        name: "level",
        label: "Düzey",
        options: ["Lisans", "Önlisans", "Ortaöğretim"],
      },
    ],
    subjects: [
      { name: "turkish", label: "Türkçe", maxQuestions: 40 },
      { name: "math", label: "Matematik", maxQuestions: 40 },
      { name: "history", label: "Tarih", maxQuestions: 20 },
      { name: "geography", label: "Coğrafya", maxQuestions: 20 },
      { name: "citizenship", label: "Vatandaşlık", maxQuestions: 10 },
      { name: "currentEvents", label: "Güncel Olaylar", maxQuestions: 10 },
    ],
    totalTime: 130,
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
    examName: z.string().min(1, "Sınav adı gereklidir."),
    solvingTime: z.coerce
      .number()
      .min(0)
      .max(config.totalTime || 180)
      .optional(),
    solvingDate: z.date({
      required_error: "Lütfen sınav tarihini seçin",
      invalid_type_error: "Geçersiz tarih formatı",
    }),
  };

  config.fields?.forEach((field) => {
    schemaFields[field.name] = z.enum(field.options as [string, ...string[]]);
  });

  config.subjects.forEach((subject) => {
    schemaFields[subject.name] = subjectSchema(subject.maxQuestions);
  });

  return z.object(schemaFields);
};

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
          placeholder="Dakika"
        />
        <CustomFormField
          fieldType={FormFieldType.NUMBER}
          control={control}
          name={`${name}.correct`}
          label="Doğru"
          min={0}
          max={maxQuestions}
          placeholder="0"
        />
        <CustomFormField
          fieldType={FormFieldType.NUMBER}
          control={control}
          name={`${name}.wrong`}
          label="Yanlış"
          min={0}
          max={maxQuestions}
          placeholder="0"
        />
      </div>
    </CardContent>
  </Card>
);

const calculateNet = (correct: number, wrong: number) => {
  return correct - wrong / 4;
};

const NetCalculationModal: React.FC<{
  onConfirm: any;
  data: any;
  currentConfig: ExamConfig;
}> = ({ onConfirm, data, currentConfig }) => {
  const { setClose } = useModal();
  const totalNet = currentConfig.subjects.reduce((acc, subject) => {
    const subjectData = data[subject.name];
    return acc + calculateNet(subjectData.correct, subjectData.wrong);
  }, 0);

  return (
    <Modal title="Net hesaplama sonuçları">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Ders</TableHead>
            <TableHead>Doğru</TableHead>
            <TableHead>Yanlış</TableHead>
            <TableHead>Net</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentConfig.subjects.map((subject) => {
            const subjectData = data[subject.name];
            const net = calculateNet(subjectData.correct, subjectData.wrong);
            return (
              <TableRow key={subject.name}>
                <TableCell>{subject.label}</TableCell>
                <TableCell>{subjectData.correct}</TableCell>
                <TableCell>{subjectData.wrong}</TableCell>
                <TableCell>{net.toFixed(2)}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <p className="mt-4 font-bold text-lg">
        Toplam Net: {totalNet.toFixed(2)}
      </p>
      <DialogFooter>
        <Button onClick={setClose} variant="outline">
          İptal
        </Button>
        <Button
          onClick={() => {
            onConfirm(data);
            setClose();
          }}
        >
          Onayla ve kaydet
        </Button>
      </DialogFooter>
    </Modal>
  );
};

const ModularExamForm: React.FC = () => {
  const [selectedExamType, setSelectedExamType] = useState<ExamType>(
    examConfigs[0].type as ExamType
  );
  const [currentConfig, setCurrentConfig] = useState<ExamConfig>(
    examConfigs[0]
  );
  const [schema, setSchema] = useState(createDynamicSchema(currentConfig));
  const [selectedField, setSelectedField] = useState<string | null>(null);

  const { setOpen } = useModal();

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {} as z.infer<typeof schema>,
  });

  useEffect(() => {
    const newConfig =
      examConfigs.find((config) => config.type === selectedExamType) ||
      examConfigs[0];
    setCurrentConfig(newConfig);
    setSelectedField(newConfig.fields?.[0]?.options[0] || null);
    const newSchema = createDynamicSchema(newConfig);
    setSchema(newSchema);

    const defaultValues: any = {
      examName: "",
      solvingTime: newConfig.totalTime,
      solvingDate: new Date(),
    };

    newConfig.fields?.forEach((field) => {
      defaultValues[field.name] = field.options[0];
    });

    newConfig.subjects.forEach((subject) => {
      defaultValues[subject.name] = {
        solvingTime: undefined,
        correct: 0,
        wrong: 0,
      };
    });

    form.reset(defaultValues);
  }, [selectedExamType, form]);

  const filteredSubjects = currentConfig.subjects.filter(
    (subject) =>
      !subject.forFields ||
      (selectedField && subject.forFields.includes(selectedField))
  );

  const onSubmit = async (data: z.infer<typeof schema>) => {
    const { examType, ...examData } = data;
    let aytField: AYTField | undefined;

    if (selectedExamType === "ayt") {
      aytField = examData.field as AYTField;
    }

    try {
      const success = await createExam(selectedExamType, examData, aytField);
      if (success) {
        console.log("Sınav başarıyla oluşturuldu");
        form.reset();
      }
    } catch (error) {
      console.error("Sınav oluşturma hatası:", error);
    }
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
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name="examName"
                label="Sınav Adı"
              />

              <CustomFormField
                fieldType={FormFieldType.DATE_PICKER}
                control={form.control}
                name="solvingDate"
                label="Sınav Tarihi"
              />

              <CustomFormField
                fieldType={FormFieldType.SELECT}
                control={form.control}
                name="examType"
                label="Sınav Türü"
                onValueChange={(value: string) => {
                  form.setValue("examType", value);
                  setSelectedExamType(value as ExamType);
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
                  onValueChange={(value: string) => {
                    form.setValue(field.name, value);
                    setSelectedField(value);
                  }}
                >
                  {field.options.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option.toUpperCase()}
                    </SelectItem>
                  ))}
                </CustomFormField>
              ))}

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
          {filteredSubjects.map((subject) => (
            <SubjectField
              key={subject.name}
              control={form.control}
              {...subject}
            />
          ))}
        </div>

        <div className="flex items-center justify-end">
          <Button
            type="button"
            size={"lg"}
            onClick={() =>
              setOpen(
                <NetCalculationModal
                  currentConfig={currentConfig}
                  onConfirm={onSubmit}
                  data={form.getValues()}
                />
              )
            }
          >
            Hesapla
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ModularExamForm;
