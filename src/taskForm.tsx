import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema, Form } from "./Schema";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Todo } from "./Schema";
import { TodoItem } from "./TodoItem";

const {
  reset,
  control,
  formState: { errors },
} = useForm<Form>({
  resolver: zodResolver(formSchema),
});

const [todos, setTodo] = useState<Todo[]>([]);
export const onSubmit = (data: Form) => {
  console.log("called");
  const uniqueId = uuidv4();
  setTodo([
    ...todos,
    {
      id: uniqueId,
      task: data.task.trim(),
      description: data.description.trim(),
      checked: false,
    },
  ]);
  reset();
};

export const handleClickDeleteButton = (id: string) => {
  setTodo(todos.filter((todo) => todo.id !== id));
};

export const handleChangeCheckBox = (id: string) => {
  const changedTodos = todos.map((todo) =>
    todo.id === id ? { ...todo, checked: !todo.checked } : todo
  );
  setTodo(changedTodos);
};

const formValues = useWatch({
  name: "description",
  control: control,
});
export const descriptionTextLength = formValues?.length;

export const TaskList = ({}) => {
  return (
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
  );
};
