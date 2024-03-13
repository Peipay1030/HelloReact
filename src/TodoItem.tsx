import { Todo } from "./schema";

type TodoItemProps = {
  todo: Todo;
  onChange: (id: string) => void;
  onDelete: (id: string) => void;
};

///todo.checkedが真ならchecked、偽なら""
///クリックされたらonDelete関数にtodo.idを与えて呼ぶ
export const TodoItem = ({
  todo,
  onChange,
  onDelete,
}: TodoItemProps) => {
  return (
    <div>
      <div>
        <h3>タスク：{todo.task}</h3>
        <p>説明文：{todo.description}</p>
      </div>
      <button onClick={() => onDelete(todo.id)}>削除</button>
      <button onClick={() => onChange(todo.id)}>タスクを移動</button>
    </div>
  );
};
