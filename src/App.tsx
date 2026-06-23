import type React from "react";
import { useReducer, useState } from "react";
import InputField from "./components/InputField";
import { TodoList } from "./components/TodoList";
import type { Todo } from "./models";

const App: React.FC = () => {
  const [todo, setTodo] = useState<string>("");
  const [todos, dispatch] = useReducer(todoReducer, []);

  type Actions =
    | { type: "add"; payload: string }
    | { type: "delete"; payload: number }
    | { type: "edit"; payload: { id: number; todo: string } }
    | { type: "toggleDone"; payload: number };

  function todoReducer(state: Todo[], action: Actions): Todo[] {
    switch (action.type) {
      case "add":
        return [...state, { id: Date.now(), todo: action.payload, isDone: false }];
      case "delete":
        return state.filter((t) => t.id !== action.payload);
      case "edit":
        return state.map((t) =>
          t.id === action.payload.id ? { ...t, todo: action.payload.todo } : t,
        );
      case "toggleDone":
        return state.map((t) => (t.id === action.payload ? { ...t, isDone: !t.isDone } : t));
      default:
        return state;
    }
  }

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
