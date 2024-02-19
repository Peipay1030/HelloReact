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
  const [todos, setTodo] = useState<Todo[]>([]);
  const [inputTask, setInputTask] = useState<string>("");
  const [inputDescription, setInputDescription] = useState<string>("");
  const [taskerrorMessage, setTaskErrorMessage] = useState<string>("");
  const [descriptionerrorMessage, setDescriptionErrorMessage] =
    useState<string>("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const trimmedTask = inputTask.trim();
    const trimmedDescription = inputDescription.trim();

    let taskError = "";
    let descriptionError = "";

    if (!trimmedTask) {
      taskError = "タスクを入力してください";
    } else if (trimmedTask.length > 15) {
      taskError = "タスクは15文字以内で入力してください";
    }

    if (!trimmedDescription.match(/^[a-zA-Z0-9]+$/)) {
      descriptionError =
        "説明文にアルファベットと数字以外を使用しないでください";
    } else if (
      trimmedDescription.length < 100 &&
      trimmedDescription.length > 15
    ) {
      descriptionError = "指定文字数を満足してください";
    }

    setTaskErrorMessage(taskError);
    setDescriptionErrorMessage(descriptionError);

    if (taskError || descriptionError) {
      return;
    }

    const uniqueId = uuidv4();
    setTodo([
      ...todos,
      {
        id: uniqueId,
        task: trimmedTask,
        description: trimmedDescription,
        checked: false,
      },
    ]);
    setInputTask("");
    setInputDescription("");
  };

  const handleChangeTask = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputTask(e.target.value);
  };

  const handleChangeDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputDescription(e.target.value);
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
      {taskerrorMessage && <p style={{ color: "red" }}>{taskerrorMessage}</p>}
      {descriptionerrorMessage && (
        <p style={{ color: "red" }}>{descriptionerrorMessage}</p>
      )}
      <form onSubmit={handleSubmit}>
        <input
          name="task"
          value={inputTask}
          onChange={handleChangeTask}
          placeholder="タスクを入力してください"
        />
        <input
          name="description"
          value={inputDescription}
          onChange={handleChangeDescription}
          placeholder="説明を入力してください"
        />
        <button>登録</button>
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
