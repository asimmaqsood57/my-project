import { InvoiceAction, InvoicesAction, InvoicesState, InvoiceState } from "../types/InvoiceTypes";
import constants from "../constants/InvoiceConstants";
import { initialState } from ".";

export const getInvoicesReducer = (state: InvoicesState = initialState, action: InvoicesAction) => {
  switch (action.type) {
    case constants.GET_INVOICES_REQUEST:
      return {
        ...state,
        loading: action.loading,
      };
    case constants.GET_INVOICES_SUCCESS:
      return {
        data: action.payload,
        loading: action.loading,
      };
    case constants.GET_INVOICES_FAILURE:
      return {
        error: action.payload,
        loading: action.loading,
      };
    default:
      return state;
  }
}

export const getInvoiceReducer = (state: InvoiceState = initialState, action: InvoiceAction) => {
  switch (action.type) {
    case constants.GET_INVOICE_REQUEST:
      return {
        ...state,
        loading: action.loading,
      };
    case constants.GET_INVOICE_SUCCESS:
      return {
        data: action.payload,
        loading: action.loading,
      };
    case constants.GET_INVOICE_FAILURE:
      return {
        error: action.payload,
        loading: action.loading,
      };
    default:
      return state;
  }
}

export const addInvoiceReducer = (state: InvoiceState = initialState, action: InvoiceAction) => {
  switch (action.type) {
    case constants.ADD_INVOICE_REQUEST:
      return {
        ...state,
        loading: action.loading,
      };
    case constants.ADD_INVOICE_SUCCESS:
      return {
        data: action.payload,
        loading: action.loading,
      };
    case constants.ADD_INVOICE_FAILURE:
      return {
        error: action.payload,
        loading: action.loading,
      };
    default:
      return state;
  }
}

export const updateInvoiceReducer = (state: InvoiceState = initialState, action: InvoiceAction) => {
  switch (action.type) {
    case constants.UPDATE_INVOICE_REQUEST:
      return {
        ...state,
        loading: action.loading,
      };
    case constants.UPDATE_INVOICE_SUCCESS:
      return {
        data: action.payload,
        loading: action.loading,
      };
    case constants.UPDATE_INVOICE_FAILURE:
      return {
        error: action.payload,
        loading: action.loading,
      };
    default:
      return state;
  }
}

export const deleteInvoiceReducer = (state: InvoiceState = initialState, action: InvoiceAction) => {
  switch (action.type) {
    case constants.DELETE_INVOICE_REQUEST:
      return {
        ...state,
        loading: action.loading,
      };
    case constants.DELETE_INVOICE_SUCCESS:
      return {
        data: action.payload,
        loading: action.loading,
      };
    case constants.DELETE_INVOICE_FAILURE:
      return {
        error: action.payload,
        loading: action.loading,
      };
    default:
      return state;
  }
}