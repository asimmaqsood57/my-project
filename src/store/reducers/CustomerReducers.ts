import { CustomerAction, CustomersAction, CustomersState, CustomerState } from "../types/CustomerTypes";
import constants from "../constants/CustomerConstants";
import { initialState } from ".";

export const getCustomersReducer = (state:CustomersState = initialState, action:CustomersAction) => {
  switch (action.type) {
    case constants.GET_CUSTOMERS_REQUEST:
      return {
        ...state,
        loading: action.loading,
      };
    case constants.GET_CUSTOMERS_SUCCESS:
      return {
        data: action.payload,
        loading: action.loading,
      };
    case constants.GET_CUSTOMERS_FAILURE:
      return {
        error: action.payload,
        loading: action.loading,
      };
    default:
      return state;
  }
}

export const deleteCustomerReducer = (state:CustomerState = initialState, action:CustomerAction) => {
  switch (action.type) {
    case constants.DELETE_CUSTOMER_REQUEST:
      return {
        loading: action.loading,
      };
    case constants.DELETE_CUSTOMER_SUCCESS:
      return {
        data: action.payload,
        loading: action.loading,
      };
    case constants.DELETE_CUSTOMER_FAILURE:
      return {
        error: action.payload,
        loading: action.loading,
      };
    default:
      return state;
  }
}

export const addCustomerReducer = (state:CustomerState = initialState, action:CustomerAction) => {
  switch (action.type) {
    case constants.ADD_CUSTOMER_REQUEST:
      return {
        loading: action.loading,
      };
    case constants.ADD_CUSTOMER_SUCCESS:
      return {
        data: action.payload,
        loading: action.loading,
      };
    case constants.ADD_CUSTOMER_FAILURE:
      return {
        error: action.payload,
        loading: action.loading,
      };
    default:
      return state;
  }
}

export const updateCustomerReducer = (state:CustomerState = initialState, action:CustomerAction) => {
  switch (action.type) {
    case constants.UPDATE_CUSTOMER_REQUEST:
      return {
        loading: action.loading,
      };
    case constants.UPDATE_CUSTOMER_SUCCESS:
      return {
        data: action.payload,
        loading: action.loading,
      };
    case constants.UPDATE_CUSTOMER_FAILURE:
      return {
        error: action.payload,
        loading: action.loading,
      };
    default:
      return state;
  }
}

export const getCustomerReducer = (state:CustomerState = initialState, action:CustomerAction) => {
  switch (action.type) {
    case constants.GET_CUSTOMER_REQUEST:
      return {
        loading: action.loading,
      };
    case constants.GET_CUSTOMER_SUCCESS:
      return {
        data: action.payload,
        loading: action.loading,
      };
    case constants.GET_CUSTOMER_FAILURE:
      return {
        error: action.payload,
        loading: action.loading,
      };
    default:
      return state;
  }
}