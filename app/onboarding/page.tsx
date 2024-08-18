"use client";

import SubmitButton from "@/components/forms/ui/submit-button";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import CustomFormField, {
  FormFieldType,
} from "@/components/ui/custom-form-field";
import { FormControl, FormDescription, FormLabel } from "@/components/ui/form";
import FormStepper from "@/components/ui/form-stepper";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { onboardingSchema } from "@/lib/schemas";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, ArrowRight } from "lucide-react";
import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";

const educationLevels = ["İlkokul", "Ortaokul", "Lise"];
const courseSubjects = {
  İlkokul: ["Genel müfredat"],
  Ortaokul: ["LGS hazırlık", "Genel müfredat"],
  Lise: ["TYT/AYT hazırlık", "Genel müfredat"],
};
const fields = ["Sayısal", "Sözel", "Eşit Ağırlık", "Dil"];
const steps = [
  {
    label: "Eğitim bilgilerin",
    description: "Alanın ve eğitim düzeyine dair bilgiler",
  },
  {
    label: "Bildirimler",
    description: "Hatırlatıcılar ve bildirimlerin yönetimi",
  },
  {
    label: "Arayüz tercihi",
    description: "Uygulamayı kişiselleştir",
  },
];

const Onboarding = () => {
  const form = useForm<z.infer<typeof onboardingSchema>>({
    resolver: zodResolver(onboardingSchema),
    defaultValues: {
      educationLevel: "Lise",
      courseSubjects: "",
      field: "Sayısal",
    },
  });

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [step, setStep] = useState<number>(0);

  async function onSubmit(values: z.infer<typeof onboardingSchema>) {
    setError(null);
    setSuccess(null);
    setLoading(true);
  }

  return (
    <Card className="max-w-3xl w-full">
      <CardHeader>
        <h1 className="header-1">Cetvel&apos;e hoşgeldin! 👋</h1>
        <p className="text-secondary-content">
          Sana en iyi deneyimi sunabilmemiz için birkaç adımı tamamlaman
          gerekiyor.
        </p>
      </CardHeader>
      <CardContent className="border-t border-neutral-200 dark:border-neutral-500 mt-6">
        <FormStepper
          activeStep={step}
          steps={steps}
          onStepChange={(step) => setStep(step)}
        />

        <FormProvider {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col space-y-4 mt-6"
          >
            {step === 0 && (
              <>
                <CustomFormField
                  fieldType={FormFieldType.SKELETON}
                  control={form.control}
                  name="educationLevel"
                  label="Eğitim seviyen"
                  renderSkeleton={(field) => (
                    <FormControl>
                      <RadioGroup
                        className="flex gap-6"
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        {educationLevels.map((level, i) => (
                          <div key={level + i} className="radio-group">
                            <RadioGroupItem
                              className="radio-group-item"
                              value={level}
                              id={level}
                            />
                            <Label htmlFor={level} className="cursor-pointer">
                              {level}
                            </Label>
                          </div>
                        ))}
                      </RadioGroup>
                    </FormControl>
                  )}
                />

                <CustomFormField
                  fieldType={FormFieldType.SKELETON}
                  control={form.control}
                  name="courseSubjects"
                  label="Hazırlık türün"
                  renderSkeleton={(field) => (
                    <FormControl>
                      <RadioGroup
                        className="flex gap-6"
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        {courseSubjects[form.watch("educationLevel")].map(
                          (type, i) => (
                            <div key={type + i} className="radio-group">
                              <RadioGroupItem
                                className="radio-group-item"
                                value={type}
                                id={type}
                              />
                              <Label htmlFor={type} className="cursor-pointer">
                                {type}
                              </Label>
                            </div>
                          )
                        )}
                      </RadioGroup>
                    </FormControl>
                  )}
                />

                {form.watch("educationLevel") === "Lise" &&
                  form.watch("courseSubjects") === courseSubjects.Lise[0] && (
                    <CustomFormField
                      fieldType={FormFieldType.SKELETON}
                      control={form.control}
                      name="field"
                      label="Alanın"
                      renderSkeleton={(field) => (
                        <FormControl>
                          <RadioGroup
                            className="flex gap-6"
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            {fields.map((field, i) => (
                              <div key={field + i} className="radio-group">
                                <RadioGroupItem
                                  className="radio-group-item"
                                  value={field}
                                  id={field}
                                />
                                <Label
                                  htmlFor={field}
                                  className="cursor-pointer"
                                >
                                  {field}
                                </Label>
                              </div>
                            ))}
                          </RadioGroup>
                        </FormControl>
                      )}
                    />
                  )}
              </>
            )}

            {step === 1 && (
              <div className="form-line">
                <div className="flex flex-col space-y-0.5 flex-grow">
                  <FormLabel>Bildirimler</FormLabel>
                  <FormDescription>
                    Etütlerin ve görevlerin hakkında hatırlatıcı ve diğer
                    bildirimleri almak ister misin?
                  </FormDescription>
                </div>

                <CustomFormField
                  fieldType={FormFieldType.SWITCH}
                  control={form.control}
                  name="notifications"
                />
              </div>
            )}
          </form>
        </FormProvider>
      </CardContent>
      <CardFooter
        className={cn(
          "flex pt-6 border-t border-t-neutral-200 dark:border-neutral-500",
          {
            "justify-between": step !== 0,
            "justify-end": step === 0,
          }
        )}
      >
        {step !== 0 && (
          <Button variant={"secondary"} onClick={() => setStep(step - 1)}>
            <ArrowLeft size={18} className="mr-2" />
            Geri Dön
          </Button>
        )}

        {step !== 2 && (
          <Button onClick={() => setStep(step + 1)}>
            İleri
            <ArrowRight size={18} className="ml-2" />
          </Button>
        )}

        {step === 2 && (
          <SubmitButton text="Kullanmaya başla" loading={loading} />
        )}
      </CardFooter>
    </Card>
  );
};

export default Onboarding;
