import { FormEvent, useState } from "react";
import { v4 as uuidv4 } from "uuid";
type Todo = {
  id: string ;
  task: string;
  checked: boolean;
};

///React hooksxxxxx
///const [stateの変数, stateを更新する関数] = useState(stateの初期値)
///stateの宣言
///state＝状態　更新されるも
const App = () => {
  //const [idCounter, setIdCounter] = useState(0);
  const [todos, setTodo] = useState<Todo[]>([]);

  /**
   *
   * フォーム送信するイベント時にstate todo配列に新たなtodoを追加する関数
   * @param {Event} e 送信イベント
   */
  const handleSubmit = (e: any) => {
    ///eventのDefaltの動作をprevent（妨げる）する
    ///ページのリロードをやめさせる
    e.preventDefault();
    ///e.target=イベントが発生した要素
    ///送信イベントからtaskを取り出して変数に入れる
    const inputText = (e.currentTarget["task"] as HTMLInputElement).value;
    const uniqueId = uuidv4();
    ///state todosを（）内の配列に更新する
    setTodo([...todos, { id: uniqueId, task: inputText, checked: false }]);
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
    const changedTodos = todos.map((todo) => {
      ///todo.idが与えたidと一致する時、checkedプロパティを反転させる
      ///元々todo内にあったchekedプロパティはどこ行く？？？
      if (todo.id === id) {
        return { ...todo, checked: !todo.checked };
      }
      return todo;
    });
    ///state todosを更新
    setTodo(changedTodos);
  };

  return (
    <div>
      <h1>ToDoList</h1>
      <form onSubmit={handleSubmit}>
        <input name="task" />
        <button>登録</button>
      </form>
      <div>
        {todos.map((todo) => (
          <div key={todo.id} className={todo.checked ? "checked" : ""}>
            <input
              type="checkbox"
              onChange={() => handleChangeCheckBox(todo.id)}
            />
            {todo.task}
            <button onClick={() => handleClickDeleteButton(todo.id)}>
              削除
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
