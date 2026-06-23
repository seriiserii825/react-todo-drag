import React, { useState } from "react";
import type { Todo } from "../models";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { MdDone } from "react-icons/md";

interface Props {
  todo: Todo;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

export const SingleTodo: React.FC<Props> = ({ todo, todos, setTodos }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [editedTodo, setEditedTodo] = useState(todo.todo);

  function handleDone(id: number) {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, isDone: !todo.isDone } : todo)));
  }

  function handleDelete(id: number) {
    setTodos(todos.filter((todo) => todo.id !== id));
  }

  function handleEdit() {
    if (!isEdit && !todo.isDone) {
      setIsEdit(true);
    }
  }

  function handleBlur() {
    setIsEdit(false);
    setTodos(todos.map((t) => (t.id === todo.id ? { ...t, todo: editedTodo } : t)));
  }

  return (
    <form className="todos__single">
      {todo.isDone ? (
        <s className="todos__single-text">{todo.todo}</s>
      ) : isEdit ? (
        <input
          type="text"
          className="todos__single-text"
          name="edit"
          value={editedTodo}
          onChange={(e) => setEditedTodo(e.target.value)}
          onBlur={handleBlur}
        />
      ) : (
        <span className="todos__single-text">{todo.todo}</span>
      )}
      <div className="todos__wrap">
        {!todo.isDone && (
          <span className="icon" onClick={handleEdit}>
            <AiFillEdit />
          </span>
        )}
        <span className="icon" onClick={() => handleDelete(todo.id)}>
          <AiFillDelete />
        </span>
        <span className="icon" onClick={() => handleDone(todo.id)}>
          <MdDone />
        </span>
      </div>
    </form>
  );
};
