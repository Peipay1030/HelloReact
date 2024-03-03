import { TaskList } from "./taskList";
import { TaskSubmit } from "./taskSubmit";
import { Todo } from "./schema";
import { useState } from "react";

const App = () => {
  const [todos, setTodo] = useState<Todo[]>([]);

  const handleClickDeleteButton = (id: string) => {
    setTodo(todos.filter((todo) => todo.id !== id));
  };

  const handleChangeCheckBox = (id: string) => {
    const changedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, checked: !todo.checked } : todo
    );
    setTodo(changedTodos);
  };

  const onSubmit = (todo: Todo) => {
    setTodo((todos) => [...todos, todo]);
  };

  const tasklistTitle = "タスク一覧";

  return (
    <div>
      <h1>ToDoList</h1>
      <TaskSubmit onSubmit={onSubmit} />
      <TaskList
        todos={todos}
        handleChangeCheckBox={handleChangeCheckBox}
        handleClickDeleteButton={handleClickDeleteButton}
        title={tasklistTitle}
      />
    </div>
  );
};
