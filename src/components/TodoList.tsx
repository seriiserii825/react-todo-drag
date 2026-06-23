import React from "react";
import type { Todo } from "../models";
import { SingleTodo } from "./SingleTodo";
import type { Actions } from "../types/Actions";

interface Props {
  todos: Todo[];
  dispatch: React.Dispatch<Actions>;
}

export const TodoList: React.FC<Props> = ({ todos, dispatch }) => {
  return (
    <div className="todos__container">
      <div className="todos">
        <span className="todos__heading">Active Tasks</span>
        {todos.map((todo) => (
          <SingleTodo key={todo.id} todo={todo} dispatch={dispatch} />
        ))}
      </div>
      <div className="todos todos--completed">
        <span className="todos__heading">Completed Tasks</span>
        {todos.map((todo) => (
          <SingleTodo key={todo.id} todo={todo} dispatch={dispatch} />
        ))}
      </div>
    </div>
  );
};
