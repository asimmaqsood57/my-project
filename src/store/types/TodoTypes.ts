import { Action, Callbacks, State } from ".";

export interface TodoRequest {
  title: string;
}

export interface Todo {
  id: string;
  title: string;
  completed?: boolean;
}
export type TodoAction = Action<Todo>; 
export type TodoState = State<Todo>;
export type TodoCallbacks = Callbacks<Todo>;

export type Todos = Todo[];
export type TodosAction = Action<Todos>;
export type TodosState = State<Todos>;
export type TodosCallbacks = Callbacks<Todos>;

