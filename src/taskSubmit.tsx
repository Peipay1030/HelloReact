import React from "react";
import { ErrorMessage } from "./ErrorMessage";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formschema, type Form, type Todo } from "./schema";
import { ToastProvider, useToast } from "./useToast";
import { SubmitButton } from "./SubmitButton";

/// onSubmit関数を引数に持つ関数
export const TaskSubmit = ({
  onSubmit,
}: {
  onSubmit: (task: string, description: string) => void;
}) => {
  /// useFormから返されたオブジェクトから指定の機能を取り出し
  /// useForm<Form>({オプション})
  const {
    reset,
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Form>({
    resolver: zodResolver(formschema),
  });

  const showToast = useToast();

  /// Form型のprops:dataを受け取って、onSubmit関数を呼ぶ
  const submit = (data: Form) => {
    console.log("call");
    onSubmit(data.task.trim(), data.description.trim());
    reset();
    showToast({ text: "Success", type: "normal" });
  };

  const error = () => {
    showToast({ text: "Error", type: "error" });
  };

  /// descripitionが更新されるたびにformValuに状態が保存される
  const formValues = useWatch({
    name: "description",
    control,
  });

  const descriptionTextLength = formValues?.length;

  /// &&(AND) 左が真なら右を評価
  return (
    <form onSubmit={handleSubmit(submit, error)}>
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
      <SubmitButton />
    </form>
  );
};
