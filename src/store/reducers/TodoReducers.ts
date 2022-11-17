import { TodoAction, TodosAction, TodosState, TodoState } from "../types/TodoTypes"
import constants from "../constants/TodoConstants";
import { initialState } from ".";

export const getTodosReducer = (state:TodosState = initialState, action: TodosAction) => {
  switch (action.type) {
    case constants.GET_TODOS_REQUEST:
      return {
        ...state,
        loading: action.loading,
      };
    case constants.GET_TODOS_SUCCESS:
      return {
        data: action.payload,
        loading: action.loading,
      };
    case constants.GET_TODOS_FAILURE:
      return {
        error: action.payload,
        loading: action.loading,
      };
    default:
      return state;
  }
}

export const addTodoReducer = (state:TodoState = initialState, action: TodoAction) => {
  switch (action.type) {
    case constants.ADD_TODO_REQUEST:
      return {
        ...state,
        loading: action.loading,
      };
    case constants.ADD_TODO_SUCCESS:
      return {
        data: action.payload,
        loading: action.loading,
      };
    case constants.ADD_TODO_FAILURE:
      return {
        error: action.payload,
        loading: action.loading,
      };
    default:
      return state;
  }
}

export const deleteTodoReducer = (state:TodoState = initialState, action: TodoAction) => {
  switch (action.type) {
    case constants.DELETE_TODO_REQUEST:
      return {
        loading: action.loading,
      };
    case constants.DELETE_TODO_SUCCESS:
      return {
        data: action.payload,
        loading: action.loading,
      };
    case constants.DELETE_TODO_FAILURE:
      return {
        error: action.payload,
        loading: action.loading,
      };
    default:
      return state;
  }
}