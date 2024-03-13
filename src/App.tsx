import { TaskList } from "./taskList";
import { TaskSubmit } from "./taskSubmit";
import { Todo } from "./schema";
import { useState, useEffect } from "react";
import { ToastProvider } from "./useToast";

const App = () => {
  const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];

  ///todos:変数
  ///setTodos:状態更新する関数
  ///useState:フック
  ///<Todo[]>[]:todosの初期値。この場合はTodo[]の空の配列([Todo[], Todo[])
  const [todos, setTodo] = useState<Todo[]>(savedTodos);

  ///filiter:trueを返す要素のみの配列を作成
  ///idが一致しない場合true(指定idのタスクを消去)
  const handleClickDeleteButton = (id: string) => {
    setTodo(todos.filter((todo) => todo.id !== id));
  };

  ///map:todosの各Todo[]に関数を適用する
  ///idが一致する場合、checkedを反転した配列を、一致しない場合、そのままのtodoを返す
  const handleChangeStatus = (id: string) => {
    const changedTodos: {
      id?: string;
      task?: string;
      description?: string;
      status?: "Todo" | "Doing" | "Done";
    }[] = todos.map((todo) =>
      todo.id === id
        ? {
            ...todo,
            status: todo.status === "Todo" ? "Doing" : "Done",
          }
        : todo
    );
    setTodo(changedTodos);
    console.log("ok");
  };

  ///todoを受け取ってtodosの後ろに追加する
  const onSubmit = (todo: Todo) => {
    setTodo((todos) => [...todos, todo]);
  };

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const tasklistTitle = "タスク一覧";

  ///TaskSubmitの引数onSubmitに関数onSubmitを与える
  ///TaskListの引数にそれぞれ定義したものを与える
  return (
    <ToastProvider>
      <div>
        <h1>ToDoList</h1>
        <TaskSubmit onSubmit={onSubmit} />
        <TaskList
          todos={todos}
          handleChangeStatus={handleChangeStatus}
          handleClickDeleteButton={handleClickDeleteButton}
          title={tasklistTitle}
        />
      </div>
    </ToastProvider>
  );
};

export default App;
