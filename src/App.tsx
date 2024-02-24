import { FormEvent, useMemo, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const todoSchema = z.object({
  id: z.string().uuid(),
  task: z
    .string()
    .min(1, { message: "タスクを入力してください" })
    .max(15, { message: "タスクは15文字以内で入力してください" }),
  description: z
    .string()
    .min(15, { message: "説明文は15文字以上入力してください" })
    .max(100, { message: "説明文は100文字以下で入力してください" })
    .regex(/^[a-zA-Z0-9]+$/, {
      message: "説明文はアルファベットと英数字で記入してください",
    }),
  checked: z.boolean(),
});

const formSchema = z.object({
  task: z
    .string()
    .min(1, { message: "タスクを入力してください" })
    .max(15, { message: "タスクは15文字以内で入力してください" }),
  description: z
    .string()
    .min(15, { message: "説明文は15文字以上入力してください" })
    .max(100, { message: "説明文は100文字以下で入力してください" })
    .regex(/^[a-zA-Z0-9]+$/, {
      message: "説明文はアルファベットと英数字で記入してください",
    }),
});

type Todo = z.infer<typeof todoSchema>;
type Form = z.infer<typeof formSchema>;

type TodoItemProps = {
  todo: Todo;
  onChange: (id: string) => void;
  onDelete: (id: string) => void;
};

const TodoItem: React.FC<TodoItemProps> = ({ todo, onChange, onDelete }) => {
  return (
    <div className={`todo-item ${todo.checked ? "checked" : ""}`}>
      <input type="checkbox" onChange={() => onChange(todo.id)} />
      <div className="content">
        <h3>タスク：{todo.task}</h3>
        <p>説明文：{todo.description}</p>
      </div>
      <button onClick={() => onDelete(todo.id)}>削除</button>
    </div>
  );
};

const ErrorMessage = ({ message }: { message: string }) => {
  return <p style={{ color: "red" }}>{message}</p>;
};

const App = () => {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    getValues,
    control,
    formState: { errors },
  } = useForm<Form>({
    resolver: zodResolver(formSchema),
  });

  const [todos, setTodo] = useState<Todo[]>([]);

  const onSubmit = (data: Form) => {
    console.log("called");
    const uniqueId = uuidv4();
    setTodo([
      ...todos,
      {
        id: uniqueId,
        task: data.task.trim(),
        description: data.description.trim(),
        checked: false,
      },
    ]);
    reset();
  };

  /**
   * 指定idをtodo配列から取り除く
   * @param {number} id
   */
  const handleClickDeleteButton = (id: string) => {
    ///state todosのtodo配列のうち、todo.idがidと一致する場合にその要素を残す
    setTodo(todos.filter((todo) => todo.id !== id));
  };

  /**
   * TODOのチェックボックスがクリックされたら該当の checked フラグを toggle する
   * @param {number} id
   */
  const handleChangeCheckBox = (id: string) => {
    const changedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, checked: !todo.checked } : todo
    );
    ///state todosを更新
    setTodo(changedTodos);
  };

  const formValues = useWatch({
    name: "description",
    control: control,
  });
  const descriptionTextLength = formValues?.length;

  return (
    <div>
      <h1>ToDoList</h1>
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
      <div>
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onChange={handleChangeCheckBox}
            onDelete={handleClickDeleteButton}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
