import { ErrorMessage } from "./ErrorMessage";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema, Form, Todo } from "./Schema";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";

export const TaskSubmit = ({
  onSubmit,
}: {
  onSubmit: (todo: Todo) => void;
}) => {
  const {
    reset,
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Form>({
    resolver: zodResolver(formSchema),
  });

  const submit = (data: Form) => {
    console.log("call");
    const uniqueId = uuidv4();
    onSubmit({
      id: uniqueId,
      task: data.task.trim(),
      description: data.description.trim(),
      checked: false,
    });
    reset();
  };

  const formValues = useWatch({
    name: "description",
    control: control,
  });
  const descriptionTextLength = formValues?.length;

  return (
    <form onSubmit={handleSubmit(submit)}>
      <label>task</label>
      <input {...register("task")} placeholder="タスクを入力してください" />
      {errors.task && <ErrorMessage message={errors.task?.message} />}
      <label>description</label>
      <input
        {...register("description")}
        placeholder="説明を入力してください"
      />
      <div>{descriptionTextLength}/100</div>
      {errors.description && (
        <ErrorMessage message={errors.description?.message} />
      )}
      <button type="submit">登録</button>
    </form>
  );
};
