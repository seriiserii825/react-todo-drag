import React, { useEffect, useState } from "react";
import type { Todo } from "../models";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { MdDone } from "react-icons/md";
import type { Actions } from "../types/Actions";
import { Draggable } from "@hello-pangea/dnd";

interface Props {
  index: number;
  todo: Todo;
  dispatch: React.Dispatch<Actions>;
}

export const SingleTodo: React.FC<Props> = ({ todo, dispatch, index }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [editedTodo, setEditedTodo] = useState(todo.todo);

  const inputRef = React.useRef<HTMLInputElement>(null);

  function handleDone(id: number) {
    dispatch({ type: "toggleDone", payload: id });
  }

  function handleDelete(id: number) {
    dispatch({ type: "delete", payload: id });
  }

  function handleEdit() {
    if (!isEdit && !todo.isDone) {
      setIsEdit(true);
    }
  }

  useEffect(() => {
    if (isEdit) {
      inputRef.current?.focus();
    }
  }, [isEdit]);

  function handleBlur(e: React.FormEvent) {
    e.preventDefault();
    setIsEdit(false);
    if (editedTodo.trim() !== "") {
      dispatch({ type: "edit", payload: { id: todo.id, todo: editedTodo } });
    } else {
      setEditedTodo(todo.todo);
    }
  }

  return (
    <Draggable draggableId={todo.id.toString()} index={index}>
      {(provided) => (
        <form
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className="todos__single"
          onSubmit={(e) => handleBlur(e)}>
          {todo.isDone ? (
            <s className="todos__single-text">{todo.todo}</s>
          ) : isEdit ? (
            <input
              type="text"
              ref={inputRef}
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
      )}
    </Draggable>
  );
};
