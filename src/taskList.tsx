import { TodoItem } from "./TodoItem";
import { type Todo } from "./schema";

/// オブジェクトの型定義
interface TaskListProps {
  todos: Todo[];
  handleChangeStatus: (id: string) => void;
  handleClickDeleteButton: (id: string) => void;
  title: string;
}

/// TaskListProps型のオブジェクトを引数に持つ関数
/// map関数を使ってtodosの各要素ごとにTodoItemコンポーネントを生成
export const TaskList = ({
  todos,
  handleChangeStatus,
  handleClickDeleteButton,
  title,
}: TaskListProps) => {
  const todoItems = todos.filter((todo) => todo.status === "Todo");
  const doingItems = todos.filter((todo) => todo.status === "Doing");
  const doneItems = todos.filter((todo) => todo.status === "Done");
  console.log(todos, todoItems, doingItems, doneItems);

  return (
    <div>
      <h2>{title}</h2>
      <div style={{ display: "flex" }}>
        <div style={{ flex: 1 }}>
          <h3>Todo</h3>
          {todoItems.map((todo) => (
            <div key={todo.id}>
              <h4>{todo.task}</h4>
              <p>{todo.description}</p>
              <button
                onClick={() => {
                  handleChangeStatus(todo.id);
                }}
              >
                Start
              </button>
              <button
                onClick={() => {
                  handleClickDeleteButton(todo.id);
                }}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
        <div style={{ flex: 1 }}>
          <h3>Doing</h3>
          {doingItems.map((todo) => (
            <div key={todo.id}>
              <h4>{todo.task}</h4>
              <p>{todo.description}</p>
              <button
                onClick={() => {
                  handleChangeStatus(todo.id);
                }}
              >
                Complete
              </button>
              <button
                onClick={() => {
                  handleClickDeleteButton(todo.id);
                }}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
        <div style={{ flex: 1 }}>
          <h3>Done</h3>
          {doneItems.map((todo) => (
            <div key={todo.id}>
              <h4>{todo.task}</h4>
              <p>{todo.description}</p>
              <p>Completed</p>
              <button
                onClick={() => {
                  handleClickDeleteButton(todo.id);
                }}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
