import { TodoItem } from "./TodoItem";
import { Todo } from "./schema";

///オブジェクトの型定義
type TaskListProps = {
  todos: Todo[];
  handleChangeCheckBox: (id: string) => void;
  handleClickDeleteButton: (id: string) => void;
  title: string;
};

///TaskListProps型のオブジェクトを引数に持つ関数
///map関数を使ってtodosの各要素ごとにTodoItemコンポーネントを生成
export const TaskList = ({
  todos,
  handleChangeCheckBox,
  handleClickDeleteButton,
  title,
}: TaskListProps) => {
  return (
    <div>
      <h2>{title}</h2>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onChange={handleChangeCheckBox}
          onDelete={handleClickDeleteButton}
        />
      ))}
    </div>
  );
};