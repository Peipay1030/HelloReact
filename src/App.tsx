import React, { useState } from "react";

type Todo = {
  id: string;
  task: string;
  description: string;
  checked: boolean;
};

const TodoItem = ()=>{
    return()
}

const TodoList = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const onsubmit = ()=>{};
  const handleSubmit = ()=>{}

  return (
    <div>
      <h2>TodoList</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          タスク：<input name="task" />
        </label>
        <div />
        <label>
            説明：<input name="description"/>
        </label>
        <button onClick={onsubmit}>登録</button>
      </form>
    </div>
  );
};

export default TodoList;
