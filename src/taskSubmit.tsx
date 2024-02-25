import { ErrorMessage } from "./ErrorMessage";
import { descriptionTextLength, onSubmit } from "./taskForm";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema, Form } from "./Schema";

const {
  register,
  handleSubmit,
  formState: { errors },
} = useForm<Form>({
  resolver: zodResolver(formSchema),
});

export const TaskSubmit = () => {
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
