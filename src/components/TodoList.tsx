import React from "react";
import type { Todo } from "../models";
import { SingleTodo } from "./SingleTodo";
import type { Actions } from "../types/Actions";
import { Droppable } from "@hello-pangea/dnd";

interface Props {
  todos: Todo[];
  dispatch: React.Dispatch<Actions>;
}

export const TodoList: React.FC<Props> = ({ todos, dispatch }) => {
  return (
    <div className="todos__container">
      <Droppable droppableId="TodosList">
        {(provided) => (
          <div className="todos" ref={provided.innerRef} {...provided.droppableProps}>
            <span className="todos__heading">Active Tasks</span>
            {todos
              .filter((todo) => !todo.isDone)
              .map((todo, index) => (
                <SingleTodo index={index} key={todo.id} todo={todo} dispatch={dispatch} />
              ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <Droppable droppableId="TodosCompleted">
        {(provided) => (
          <div
            className="todos todos--completed"
            ref={provided.innerRef}
            {...provided.droppableProps}>
            <span className="todos__heading">Completed Tasks</span>
            {todos
              .filter((todo) => todo.isDone)
              .map((todo, index) => (
                <SingleTodo index={index} key={todo.id} todo={todo} dispatch={dispatch} />
              ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};
