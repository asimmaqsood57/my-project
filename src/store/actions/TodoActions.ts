import { Dispatch } from "redux";
import axios from "../../config/axios";
import constants from "../constants/TodoConstants";
import { Todo, TodoAction, TodoCallbacks, TodoRequest, Todos, TodosAction, TodosCallbacks } from "../types/TodoTypes";

export const getTodos = (callbacks: TodosCallbacks) => async(dispatch: Dispatch<TodosAction>)=> {
  try {
    dispatch({ type: constants.GET_TODOS_REQUEST, loading: true });
    const res = await axios.get<Todos>(`/todo/${localStorage.getItem("userToken")}`);
    dispatch({
      type: constants.GET_TODOS_SUCCESS,
      payload: res.data,
      loading: false,
    })
  } catch (err) {
    callbacks.onFailure?.(err);
    dispatch({
      type: constants.GET_TODOS_FAILURE,
      payload: err,
      loading: false,
    })
  }
}
export const addTodo = (data: TodoRequest,callbacks: TodoCallbacks) => async(dispatch: Dispatch<TodoAction>)=> {
  try {
    dispatch({ type: constants.ADD_TODO_REQUEST, loading: true });
    callbacks.onRequest?.();
    const res = await axios.post<Todo>(`/todo/${localStorage.getItem("userToken")}`, data);
    callbacks.onSuccess?.(res.data);
    dispatch({
      type: constants.ADD_TODO_SUCCESS,
      payload: res.data,
      loading: false,
    })
  } catch (err) {
    callbacks.onFailure?.(err);
    dispatch({
      type: constants.ADD_TODO_FAILURE,
      payload: err,
      loading: false,
    })
  }
}

export const deleteTodo = (id: string, callbacks: TodoCallbacks) => async(dispatch: Dispatch<TodoAction>)=> {
  try {
    dispatch({ type: constants.DELETE_TODO_REQUEST, loading: true });
    callbacks.onRequest?.();
    const res = await axios.delete<Todo>(`/todo/${id}/${localStorage.getItem("userToken")}`);
    callbacks.onSuccess?.(res.data);
    dispatch({
      type: constants.DELETE_TODO_SUCCESS,
      payload: res.data,
      loading: false,
    })
  } catch (err) {
    callbacks.onFailure?.(err);
    dispatch({
      type: constants.DELETE_TODO_FAILURE,
      payload: err,
      loading: false,
    })
  }
}