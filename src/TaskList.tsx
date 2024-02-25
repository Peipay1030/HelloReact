import { TodoItem } from "./TodoItem";
import { Todo } from "./schema";

type TaskListProps = {
  todos: Todo[];
  handleChangeCheckBox: (id: string) => void;
  handleClickDeleteButton: (id: string) => void;
  title: string;
};

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
