import type React from "react";
import { useReducer, useState } from "react";
import InputField from "./components/InputField";
import { TodoList } from "./components/TodoList";
import { todoReducer } from "./reducers/todoReducer";
import { DragDropContext, type DropResult } from "@hello-pangea/dnd";

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

  function onDragEnd(result: DropResult) {
    const { source, destination } = result;

    if (!destination) return;
    if (source.droppableId === destination.droppableId && source.index === destination.index)
      return;

    if (source.droppableId !== destination.droppableId) {
      const sourceTodos = todos.filter((todo) =>
        source.droppableId === "TodosList" ? !todo.isDone : todo.isDone,
      );
      const destinationTodos = todos.filter(
        todo => (destination.droppableId === "TodosList" ? !todo.isDone : todo.isDone)
      );

      const [movedTodo] = sourceTodos.splice(source.index, 1);
      movedTodo.isDone = destination.droppableId === "TodosCompleted";

      const updatedSourceTodos = [...sourceTodos];
      const updatedDestinationTodos = [...destinationTodos];
      updatedDestinationTodos.splice(destination.index, 0, movedTodo);

      const updatedTodos = [
        ...updatedSourceTodos,
        ...updatedDestinationTodos
      ];

      dispatch({ type: "reorder", payload: updatedTodos });
    } else {
      const updatedTodos = [...todos];

      const [movedTodo] = updatedTodos.splice(source.index, 1);
      updatedTodos.splice(destination.index, 0, movedTodo);

      dispatch({ type: "reorder", payload: updatedTodos });
    }
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="App">
        <div className="App__wrapper">
          <h2 className="heading">Taskify</h2>
          <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
          <TodoList todos={todos} dispatch={dispatch} />
        </div>
      </div>
    </DragDropContext>
  );
};

export default App;
