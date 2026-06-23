import type { Todo } from "../models";

export type Actions =
  | { type: "add"; payload: string }
  | { type: "delete"; payload: number }
  | { type: "edit"; payload: { id: number; todo: string } }
  | { type: "toggleDone"; payload: number }
  | { type: "reorder"; payload: Todo[] };
