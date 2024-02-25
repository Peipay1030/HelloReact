import { TaskList } from "./taskForm";
import { TaskSubmit } from "./taskSubmit";

const App = () => {
  return (
    <div>
      <h1>ToDoList</h1>
      <TaskSubmit />
      <TaskList />
    </div>
  );
};

export default App;
