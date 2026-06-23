import type React from "react";
import { useReducer, useState } from "react";
import InputField from "./components/InputField";
import { TodoList } from "./components/TodoList";
import { todoReducer } from "./reducers/todoReducer";

const App: React.FC = () => {
  const [todo, setTodo] = useState<string>("");
  const [todos, dispatch] = useReducer(todoReducer, []);

  function handleAdd(e: React.SubmitEvent) {
    e.preventDefault();
    if (todo) {
      dispatch({ type: "add", payload: todo });
      setTodo("");
    }
  }

  return (
    <div className="App">
      <div className="App__wrapper">
        <h2 className="heading">Taskify</h2>
        <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
        <TodoList todos={todos} dispatch={dispatch} />
      </div>
    </div>
  );
};

export default App;
