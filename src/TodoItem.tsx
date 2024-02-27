import { Todo } from "./schema";

type TodoItemProps = {
  todo: Todo;
  onChange: (id: string) => void;
  onDelete: (id: string) => void;
};

const TodoItem = ({ todo, onChange, onDelete }: TodoItemProps) => {
  return (
    <div className={`todo-item ${todo.checked ? "checked" : ""}`}>
      <input type="checkbox" onChange={() => onChange(todo.id)} />
      <div>
        <h3>タスク：{todo.task}</h3>
        <p>説明文：{todo.description}</p>
      </div>
      <button onClick={() => onDelete(todo.id)}>削除</button>
    </div>
  );
};
