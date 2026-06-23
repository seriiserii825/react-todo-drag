import type { Todo } from "../models";
import type { Actions } from "../types/Actions";

export function todoReducer(state: Todo[], action: Actions): Todo[] {
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
    case "reorder":
      return action.payload;
    default:
      return state;
  }
}
