"use client";

import { useState, useEffect, useRef } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TaskSchema } from "@/lib/schemas";
import { z } from "zod";
import { Form } from "../ui/form";
import CustomFormField, { FormFieldType } from "../ui/custom-form-field";
import SubmitButton from "./ui/submit-button";
import { SelectItem } from "../ui/select";
import isEqual from "lodash/isEqual";
import { Button } from "../ui/button";
import { useModal } from "@/providers/modal-provider";
import { ArrowUpFromLine, Check, LoaderCircle, Trash, X } from "lucide-react";
import useSWR from "swr";
import {
  createTask,
  deleteTask,
  toggleTaskComplete,
  updateTask,
} from "@/lib/services/task-service";
import { fetcher } from "@/lib/utils";

type TaskFormProps = {
  type?: "edit" | "create";
  task?: Task;
};

const TaskForm = ({ type = "create", task }: TaskFormProps) => {
  const {
    data: tags,
    isLoading: isTagsLoading,
    error: tagsError,
  } = useSWR<Tag[]>("/tag", fetcher);
  const { setClose } = useModal();
  const [isFormChanged, setIsFormChanged] = useState<boolean>(false);

  const defaultValues = {
    title: task?.title || "",
    tag: task?.tag || "",
    startsAt: task?.startsAt ? new Date(task.startsAt) : new Date(),
    endsAt: task?.endsAt ? new Date(task.endsAt) : new Date(),
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
    const data = {
      ...values,
      startsAt: values.startsAt.toISOString(),
      endsAt: values.endsAt.toISOString(),
    };

    const success: any =
      type === "create"
        ? await createTask(data)
        : await updateTask(task?._id!, data);

    if (success) {
      if (type === "create") {
        form.reset();
      }
      setClose();
    }
  }

  async function onDelete() {
    const success = await deleteTask(task?._id!);
    if (success) {
      setClose();
    }
  }

  async function toggleComplete() {
    const success = await toggleTaskComplete(task!);
    if (success) {
      setClose();
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

        {type === "edit" && (
          <div className="flex justify-center">
            <SubmitButton
              icon={<ArrowUpFromLine size={16} />}
              loading={form.formState.isSubmitting}
              additionalButtons={[
                ({ loading }) => ({
                  button: (
                    <Button
                      type="button"
                      onClick={toggleComplete}
                      disabled={loading}
                      variant="secondary"
                    >
                      {task?.status === "completed" ? (
                        <X size={16} />
                      ) : (
                        <Check size={16} />
                      )}
                    </Button>
                  ),
                }),

                ({ loading }) => ({
                  button: (
                    <Button
                      type="button"
                      onClick={onDelete}
                      disabled={loading}
                      variant="destructive"
                    >
                      <Trash size={16} />
                    </Button>
                  ),
                }),
              ]}
            />
          </div>
        )}
        {type === "create" && (
          <SubmitButton text="Oluştur" loading={form.formState.isSubmitting} />
        )}
      </form>
    </Form>
  );
};

export default TaskForm;
