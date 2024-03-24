import { TaskList } from "./taskList";
import { TaskSubmit } from "./taskSubmit";
import { type Todo } from "./schema";
import { useState, useEffect } from "react";
import { ToastProvider } from "./useToast";
import axios from "axios";

const backendApi = axios.create({
  baseURL: "http://localhost:3000", // バックエンドサーバーのURLに合わせて変更する必要があります
});

const parseTypetodos = (responsestatus: string): Todo[`status`] => {
  switch (responsestatus) {
    case `todo`:
      return `Todo`;
    case `doing`:
      return `Doing`;
    case "done":
      return "Done";
  }
};

const App = () => {
  /// todos:変数
  /// setTodos:状態更新する関数
  /// useState:フック
  /// <Todo[]>[]:todosの初期値。この場合はTodo[]の空の配列([Todo[], Todo[])
  const [todos, setTodo] = useState<Todo[]>([]);

  useEffect(() => {
    const fetchDataFromServer = async () => {
      try {
        // サーバーからデータを取得
        const response = await backendApi.get("/todo");
        // データを取得して状態にセット
        const parseServerDataForFrontend = (response: any): Todo => {
          const todosfromserver: Todo = {
            id: response.id,
            task: response.task,
            description: response.description,
            status: parseTypetodos(response.status),
          };
          return todosfromserver;
        };

        const changedTodos: Todo[] = response.data.map((v: any) => {
          return parseServerDataForFrontend(v);
        });
        setTodo(changedTodos);
      } catch (error) {
        console.error("Error fetching data from server: ", error);
      }
    };
    // コンポーネントがマウントされたときにデータを取得
    fetchDataFromServer();
  }, []);

  /// todoを受け取ってtodosの後ろに追加する
  const onSubmit = (todo: Todo) => {
    setTodo((todos) => [...todos, todo]);
    const parsePosttodos = () => {
      return {
        title: todo.task,
        description: todo.description,
      };
    };
    const postDataToServer = async () => {
      try {
        await backendApi.post("/todo", parsePosttodos());
        console.log("hoge", parsePosttodos);
      } catch (error) {
        console.log("Error posting data to server:", error);
      }
    };
    postDataToServer();
  };

  /// filiter:trueを返す要素のみの配列を作成
  /// idが一致しない場合true(指定idのタスクを消去)
  const handleClickDeleteButton = (id: string) => {
    setTodo(todos.filter((todo) => todo.id !== id));
  };

  /// map:todosの各Todo[]に関数を適用する
  /// idが一致する場合、checkedを反転した配列を、一致しない場合、そのままのtodoを返す
  const handleChangeStatus = (id: string) => {
    const changedTodos: Array<{
      id?: string;
      task?: string;
      description?: string;
      status?: "Todo" | "Doing" | "Done";
    }> = todos.map((todo) =>
      todo.id === id
        ? {
            ...todo,
            status: todo.status === "Todo" ? "Doing" : "Done",
          }
        : todo,
    );
    setTodo(changedTodos);
    console.log("ok");
  };

  const tasklistTitle = "タスク一覧";

  /// TaskSubmitの引数onSubmitに関数onSubmitを与える
  /// TaskListの引数にそれぞれ定義したものを与える
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
