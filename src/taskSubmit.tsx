import { ErrorMessage } from "./ErrorMessage";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formschema, Form, Todo } from "./schema";
import { v4 as uuidv4 } from "uuid";

///onSubmit関数を引数に持つ関数
export const TaskSubmit = ({
  onSubmit,
}: {
  onSubmit: (todo: Todo) => void;
}) => {
  ///useFormから返されたオブジェクトから指定の機能を取り出し
  ///useForm<Form>({オプション})
  const {
    reset,
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Form>({
    resolver: zodResolver(formschema),
  });

  ///Form型のprops:dataを受け取って、onSubmit関数を呼ぶ
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

  ///descripitionが更新されるたびにformValuに状態が保存される
  const formValues = useWatch({
    name: "description",
    control: control,
  });

  const descriptionTextLength = formValues?.length;

  ///&&(AND) 左が真なら右を評価
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
