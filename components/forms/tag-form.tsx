"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TagSchema } from "@/lib/schemas";
import { mutate } from "swr";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import SubmitButton from "./ui/submit-button";
import { Input } from "../ui/input";
import { useToast } from "../ui/use-toast";
import { axiosInstance } from "@/lib/utils";

const TagForm = () => {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof TagSchema>>({
    resolver: zodResolver(TagSchema),
    defaultValues: {
      label: "",
    },
  });

  const [loading, setLoading] = useState<boolean>(false);

  async function onSubmit(values: z.infer<typeof TagSchema>) {
    setLoading(true);

    toast({
      title: values.label,
      description: "Etiket oluşturuluyor...",
    });

    const data = {
      label: values.label,
      value: values.label,
    };

    try {
      const res = await axiosInstance.post("/tag", data);

      if (res.status === 201) {
        form.reset();
        toast({
          title: values.label,
          description: "Etiket oluşturuldu",
        });
        mutate("/tag");
      }
    } catch (error) {
      toast({
        title: values.label,
        description: "Bir hata oluştu",
        variant: "destructive",
      });
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex items-center space-x-2 flex-col sm:flex-row"
      >
        <FormField
          control={form.control}
          name="label"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Input {...field} placeholder="Etiket adı" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <SubmitButton text="Ekle" className="ml-auto" loading={loading} />
      </form>
    </Form>
  );
};

export default TagForm;
