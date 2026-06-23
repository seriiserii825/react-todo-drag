import React from "react";
import type { Todo } from "../models";

interface Props {
  todo: Todo;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

export const SingleTodo: React.FC<Props> = ({ todo }) => {
  return (
    <form className="todos__single">
      <span className="todos__single-text">{todo.todo}</span>
      <div>
        <span className="icon"></span>
        <span className="icon"></span>
        <span className="icon"></span>
      </div>
    </form>
  );
};
