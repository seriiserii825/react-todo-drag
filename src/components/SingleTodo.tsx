import React from "react";
import type { Todo } from "../models";

interface Props {
  todo: Todo;
}

export const SingleTodo: React.FC<Props> = ({ todo }) => {
  return (
    <div className="todo">
      <span>{todo.todo}</span>
    </div>
  );
};
