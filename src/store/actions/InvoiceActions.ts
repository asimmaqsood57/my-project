import { Dispatch } from "redux";
import {
  Invoice,
  InvoiceAction,
  InvoiceCallbacks,
  InvoiceRequest,
  Invoices,
  InvoicesAction,
  InvoicesCallbacks,
} from "../types/InvoiceTypes";
import constants from "../constants/InvoiceConstants";
import axios from "../../config/axios";
export const getInvoices =
  (callbacks: InvoicesCallbacks) =>
  async (dispatch: Dispatch<InvoicesAction>) => {
    try {
      dispatch({ type: constants.GET_INVOICES_REQUEST, loading: true });
      callbacks.onRequest?.();
      const response = await axios.get<Invoices>(
        `/invoice/${localStorage.getItem("userToken")}`
      );
      dispatch({
        type: constants.GET_INVOICES_SUCCESS,
        payload: response.data,
        loading: false,
      });
      callbacks.onSuccess?.(response.data);
    } catch (err) {
      callbacks.onFailure?.(err);
      dispatch({
        type: constants.GET_INVOICES_FAILURE,
        payload: err,
        loading: false,
      });
    }
  };

export const getInvoice =
  (id: number, callbacks: InvoiceCallbacks) =>
  async (dispatch: Dispatch<InvoiceAction>) => {
    try {
      dispatch({ type: constants.GET_INVOICE_REQUEST, loading: true });
      callbacks.onRequest?.();
      if (id > 0) {
        const token = localStorage.getItem("userToken");
        const response = await axios.get<Invoice>(`/invoice/${id}/${token}`);
        dispatch({
          type: constants.GET_INVOICE_SUCCESS,
          payload: response.data,
          loading: false,
        });
        callbacks.onSuccess?.(response.data);
      } else {
        dispatch({
          type: constants.GET_INVOICE_SUCCESS,
          payload: null,
          loading: false,
        });
      }
    } catch (err) {
      callbacks.onFailure?.(err);
      dispatch({
        type: constants.GET_INVOICE_FAILURE,
        payload: err,
        loading: false,
      });
    }
  };

  export const updateInvoice =
  (
    mLink: string,
    id: number,
    data: InvoiceRequest,
    callbacks: InvoiceCallbacks
  ) =>
      async (dispatch: Dispatch<InvoiceAction>) => {
         
    try {
      dispatch({ type: constants.UPDATE_INVOICE_REQUEST, loading: true });
      callbacks.onRequest?.();
      const response = await axios.put<Invoice>(
        `/${mLink}/${id}/${localStorage.getItem("userToken")}`,
        data
      );
      dispatch({
        type: constants.UPDATE_INVOICE_SUCCESS,
        payload: response.data,
        loading: false,
      });
      callbacks.onSuccess?.(response.data);
    } catch (err) {
      
      callbacks.onFailure?.(err);
      dispatch({
        type: constants.UPDATE_INVOICE_FAILURE,
        payload: err,
        loading: false,
      });
    }
  };

export const addInvoice =
  (mLink: string, data: InvoiceRequest, callbacks: InvoiceCallbacks) =>
  async (dispatch: Dispatch<InvoiceAction>) => {
    try {
      dispatch({ type: constants.ADD_INVOICE_REQUEST, loading: true });
      callbacks.onRequest?.();
      const response = await axios.post<Invoice>(
        `/${mLink}/${localStorage.getItem("userToken")}`,
        data
      );
      dispatch({
        type: constants.ADD_INVOICE_SUCCESS,
        payload: response.data,
        loading: false,
      });
      callbacks.onSuccess?.(response.data);
    } catch (err) {
      callbacks.onFailure?.(err);
      dispatch({
        type: constants.ADD_INVOICE_FAILURE,
        payload: err,
        loading: false,
      });
    }
  };

export const deleteInvoice =
  (id: number, callbacks: InvoiceCallbacks) =>
  async (dispatch: Dispatch<InvoiceAction>) => {
    try {
      dispatch({ type: constants.DELETE_INVOICE_REQUEST, loading: true });
      callbacks.onRequest?.();
      const response = await axios.delete<Invoice>(
        `/invoice/${id}/${localStorage.getItem("userToken")}`
      );
      dispatch({
        type: constants.DELETE_INVOICE_SUCCESS,
        payload: response.data,
        loading: false,
      });
      callbacks.onSuccess?.(response.data);
    } catch (err) {
      callbacks.onFailure?.(err);
      dispatch({
        type: constants.DELETE_INVOICE_FAILURE,
        payload: err,
        loading: false,
      });
    }
  };