// TodoItem.tsx
import React from "react";
import {Todo} from "./Schema";

type TodoItemProps = {
  todo: Todo;
  onChange: (id: string) => void;
  onDelete: (id: string) => void;
};

export const TodoItem: React.FC<TodoItemProps> = ({ todo, onChange, onDelete }) => {
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
