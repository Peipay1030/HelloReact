import { FormEvent, useState } from "react";
import { v4 as uuidv4 } from "uuid";
type Todo = {
  id: string;
  task: string;
  checked: boolean;
};

type TodoItemProps = {
  todo: Todo;
  onChange: (id: string) => void;
  onDelete: (id: string) => void;
};

const TodoItem: React.FC<TodoItemProps> = ({ todo, onChange, onDelete }) => {
  return (
    <div className={todo.checked ? "checked" : ""}>
      <input type="checkbox" onChange={() => onChange(todo.id)} />
      {todo.task}
      <button onClick={() => onDelete(todo.id)}>削除</button>
    </div>
  );
};

///React hooks
///const [stateの変数, stateを更新する関数] = useState(stateの初期値)
///stateの宣言
///state＝状態　更新されるも
const App = () => {
  const [todos, setTodo] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  /**
   *
   * フォーム送信するイベント時にstate todo配列に新たなtodoを追加する関数
   * @param {Event} e 送信イベント
   */
  const handleSubmit = (e: any) => {
    ///eventのDefaltの動作をprevent（妨げる）する
    ///ページのリロードをやめさせる
    e.preventDefault();
    const trimmedValue = inputValue.trim();

    if (!trimmedValue) {
      setErrorMessage("タスクを入力してください");
      return;
    }
    if (trimmedValue.length > 15) {
      setErrorMessage("タスクは15文字以内で入力してください");
      return;
    }

    ///e.target=イベントが発生した要素
    ///送信イベントからtaskを取り出して変数に入れる
    const uniqueId = uuidv4();
    ///state todosを（）内の配列に更新する
    setTodo([...todos, { id: uniqueId, task: trimmedValue, checked: false }]);
    setInputValue("");
    setErrorMessage("");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
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
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <input name="task" value={inputValue} onChange={handleChange} />
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
