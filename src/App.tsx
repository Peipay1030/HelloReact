import { FormEvent, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useForm } from "react-hook-form";

type Todo = {
  id: string;
  task: string;
  description: string;
  checked: boolean;
};

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

const App = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [todos, setTodo] = useState<Todo[]>([]);

  const onSubmit = (data: Todo) => {
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

  return (
    <div>
      <h1>ToDoList</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("task", { required: true, maxLength: 15 })}
          placeholder="タスクを入力してください"
        />
        {errors.task && errors.task.type === "required" && (
          <p style={{ color: "red" }}>タスクを入力してください</p>
        )}
        {errors.task && errors.task.type === "maxLength" && (
          <p style={{ color: "red" }}>タスクは15文字以内で入力してください</p>
        )}

        <input
          {...register("description", {
            required: true,
            pattern: /^[a-zA-Z0-9]+$/,
            minLength: 15,
            maxLength: 100,
          })}
          placeholder="説明を入力してください"
        />
        {errors.description && (
          <p style={{ color: "red" }}>
            {errors.description.type === "required" && "説明を入力してください"}
            {errors.description.type === "pattern" &&
              "説明文にアルファベットと数字以外を使用しないでください"}
            {(errors.description.type === "minLength" ||
              errors.description.type === "maxLength") &&
              "説明は15文字以上100文字以下で入力してください"}
          </p>
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
