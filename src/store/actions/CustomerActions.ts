import { Dispatch } from "redux";
import axios from "../../config/axios";
import constants from "../constants/CustomerConstants";
import { CustomersCallbacks, CustomersAction, Customers, CustomerAction, CustomerCallbacks, Customer, CustomerRequest } from "../types/CustomerTypes";



export const getCustomers = (callbacks?: CustomersCallbacks) => async (dispatch: Dispatch<CustomersAction>)=> {
  try {
    dispatch({ type: constants.GET_CUSTOMERS_REQUEST, loading: true });
    callbacks?.onRequest?.();
    const response = await axios.get<Customers>(`/customer/${localStorage.getItem("userToken")}`);
    dispatch({
      type: constants.GET_CUSTOMERS_SUCCESS,
      payload: response.data,
      loading: false,
    });
    callbacks?.onSuccess?.(response.data);
  } catch (err) {
    callbacks?.onFailure?.(err);
    dispatch({
      type: constants.GET_CUSTOMERS_FAILURE,
      payload: err,
      loading: false,
    });
  }
}

export const deleteCustomer = (id: string, callbacks: CustomerCallbacks) => async (dispatch: Dispatch<CustomerAction>)=> {
  try {
    dispatch({ type: constants.DELETE_CUSTOMER_REQUEST, loading: true });
    callbacks.onRequest?.();
    const response = await axios.delete<Customer>(`/customer/${id}/${localStorage.getItem("userToken")}`);
    callbacks.onSuccess?.(response.data);
    dispatch({
      type: constants.DELETE_CUSTOMER_SUCCESS,
      payload: response.data,
      loading: false,
    });
  } catch (err) {
    callbacks.onFailure?.(err);
    dispatch({
      type: constants.DELETE_CUSTOMER_FAILURE,
      payload: err,
      loading: false,
    });
  }
}

export const addCustomer = (customer: CustomerRequest, callbacks: CustomerCallbacks) => async (dispatch: Dispatch<CustomerAction>)=> {
  try {
    dispatch({ type: constants.ADD_CUSTOMER_REQUEST, loading: true });
    callbacks.onRequest?.();
    const response = await axios.post<Customer>(`/customer/${localStorage.getItem("userToken")}`, customer);
    callbacks.onSuccess?.(response.data);
    dispatch({
      type: constants.ADD_CUSTOMER_SUCCESS,
      payload: response.data,
      loading: false,
    });
  } catch (err) {
    callbacks.onFailure?.(err);
    dispatch({
      type: constants.ADD_CUSTOMER_FAILURE,
      payload: err,
      loading: false,
    });
  }
}

export const updateCustomer = (customer: CustomerRequest,id: string, callbacks: CustomerCallbacks) => async (dispatch: Dispatch<CustomerAction>)=> {
  try {
    dispatch({ type: constants.UPDATE_CUSTOMER_REQUEST, loading: true });
    callbacks.onRequest?.();
    const response = await axios.put<Customer>(`/customer/${id}/${localStorage.getItem("userToken")}`, customer);
    callbacks.onSuccess?.(response.data);
    dispatch({
      type: constants.UPDATE_CUSTOMER_SUCCESS,
      payload: response.data,
      loading: false,
    });
  } catch (err) {
    callbacks.onFailure?.(err);
    dispatch({
      type: constants.UPDATE_CUSTOMER_FAILURE,
      payload: err,
      loading: false,
    });
  }
}

export const getCustomer = (id: string, callbacks: CustomerCallbacks) => async (dispatch: Dispatch<CustomerAction>)=> {
  try {
    dispatch({ type: constants.GET_CUSTOMER_REQUEST, loading: true });
    callbacks.onRequest?.();
    const response = await axios.get<Customer>(`/customer/${id}/${localStorage.getItem("userToken")}`);
    callbacks.onSuccess?.(response.data);
    dispatch({
      type: constants.GET_CUSTOMER_SUCCESS,
      payload: response.data,
      loading: false,
    });
  } catch (err) {
    callbacks.onFailure?.(err);
    dispatch({
      type: constants.GET_CUSTOMER_FAILURE,
      payload: err,
      loading: false,
    });
  }
}