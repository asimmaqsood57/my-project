import { Dispatch } from "redux";
import axios from "../../config/axios";
import constants from "../constants/DataConstants";
import {
  DocumentTypes,
  DocumentTypesAction,
  DocumentTypesCallbacks,
  InvoiceType,
  InvoiceTypeAction,
  InvoiceTypeCallbacks,
  InvoiceTypes,
  InvoiceTypesAction,
  InvoiceTypesCallbacks,
  PaymentTerm,
  PaymentTermAction,
  PaymentTermCallbacks,
  PaymentTermRequest,
  PaymentTerms,
  PaymentTermsAction,
  PaymentTermsCallbacks,
  SaftTypeAction,
  SaftTypeCallbacks,
  SaftTypes,
  TaxAction,
  TaxCallbacks,
  Taxes,
  TaxExemptionReasonAction,
  TaxExemptionReasonCallbacks,
  TaxExemptionReasons,
  UnitAction,
  UnitCallbacks,
  Units,
} from "../types/DataTypes";

export const getPaymentTerms =
  (callbacks: PaymentTermsCallbacks) =>
  async (dispatch: Dispatch<PaymentTermsAction>) => {
    try {
      dispatch({ type: constants.GET_PAYMENT_TERMS_REQUEST, loading: true });
      callbacks.onRequest?.();
      const response = await axios.get<PaymentTerms>(
        `/paymentTerm/${localStorage.getItem("userToken")}`
      );
      dispatch({
        type: constants.GET_PAYMENT_TERMS_SUCCESS,
        payload: response.data,
        loading: false,
      });
      callbacks.onSuccess?.(response.data);
    } catch (err) {
      callbacks.onFailure?.(err);
      dispatch({
        type: constants.GET_PAYMENT_TERMS_FAILURE,
        payload: err,
        loading: false,
      });
    }
  };

export const addPaymentTerm =
  (data: PaymentTermRequest, callbacks: PaymentTermCallbacks = {}) =>
  async (dispatch: Dispatch<PaymentTermAction>) => {
    try {
      dispatch({ type: constants.ADD_PAYMENT_TERM_REQUEST, loading: true });
      callbacks.onRequest?.();
      const response = await axios.post<PaymentTerm>(
        `/paymentTerm/${localStorage.getItem("userToken")}`,
        data
      );
      dispatch({
        type: constants.ADD_PAYMENT_TERM_SUCCESS,
        payload: response.data,
        loading: false,
      });
      callbacks.onSuccess?.(response.data);
    } catch (err) {
      callbacks.onFailure?.(err);
      dispatch({
        type: constants.ADD_PAYMENT_TERM_FAILURE,
        payload: err,
        loading: false,
      });
    }
  };

export const updatePaymentTerm =
  (
    id: string,
    data: PaymentTermRequest,
    callbacks: PaymentTermCallbacks = {}
  ) =>
  async (dispatch: Dispatch<PaymentTermAction>) => {
    try {
      dispatch({ type: constants.UPDATE_PAYMENT_TERM_REQUEST, loading: true });
      callbacks.onRequest?.();
      const response = await axios.put<PaymentTerm>(
        `/paymentTerm/${id}/${localStorage.getItem("userToken")}`,
        data
      );
      dispatch({
        type: constants.UPDATE_PAYMENT_TERM_SUCCESS,
        payload: response.data,
        loading: false,
      });
      callbacks.onSuccess?.(response.data);
    } catch (err) {
      callbacks.onFailure?.(err);
      dispatch({
        type: constants.UPDATE_PAYMENT_TERM_FAILURE,
        payload: err,
        loading: false,
      });
    }
  };

export const getPaymentTerm =
  (id: string, callbacks: PaymentTermCallbacks = {}) =>
  async (dispatch: Dispatch<PaymentTermAction>) => {
    try {
      dispatch({ type: constants.GET_PAYMENT_TERM_REQUEST, loading: true });
      callbacks.onRequest?.();
      if(id) {
        const response = await axios.get<PaymentTerm>(
          `/paymentTerm/${id}/${localStorage.getItem("userToken")}`
        );
        dispatch({
          type: constants.GET_PAYMENT_TERM_SUCCESS,
          payload: response.data,
          loading: false,
        });
        callbacks.onSuccess?.(response.data);
      } else {
        dispatch({
          type: constants.GET_PAYMENT_TERM_SUCCESS,
          payload: null,
          loading: false,
        });
      }
    } catch (err) {
      callbacks.onFailure?.(err);
      dispatch({
        type: constants.GET_PAYMENT_TERM_FAILURE,
        payload: err,
        loading: false,
      });
    }
  };

export const getInvoiceTypes =
  (callbacks: InvoiceTypesCallbacks = {}) =>
  async (dispatch: Dispatch<InvoiceTypesAction>) => {
    try {
      dispatch({ type: constants.GET_INVOICE_TYPES_REQUEST, loading: true });
      callbacks.onRequest?.();
      const response = await axios.get<InvoiceTypes>(
        `/invoiceType/${localStorage.getItem("userToken")}`
      );
      dispatch({
        type: constants.GET_INVOICE_TYPES_SUCCESS,
        payload: response.data,
        loading: false,
      });
      callbacks.onSuccess?.(response.data);
    } catch (err) {
      callbacks.onFailure?.(err);
      dispatch({
        type: constants.GET_INVOICE_TYPES_FAILURE,
        payload: err,
        loading: false,
      });
    }
  };

export const addInvoiceType =
  (data: PaymentTermRequest, callbacks: InvoiceTypeCallbacks = {}) =>
  async (dispatch: Dispatch<InvoiceTypeAction>) => {
    try {
      dispatch({ type: constants.ADD_INVOICE_TYPE_REQUEST, loading: true });
      callbacks.onRequest?.();
      const response = await axios.post<InvoiceType>(
        `/invoiceType/${localStorage.getItem("userToken")}`,
        data
      );
      dispatch({
        type: constants.ADD_INVOICE_TYPE_SUCCESS,
        payload: response.data,
        loading: false,
      });
      callbacks.onSuccess?.(response.data);
    } catch (err) {
      callbacks.onFailure?.(err);
      dispatch({
        type: constants.ADD_INVOICE_TYPE_FAILURE,
        payload: err,
        loading: false,
      });
    }
  };

export const updateInvoiceType =
  (id: string, data: PaymentTermRequest, callbacks: InvoiceTypeCallbacks = {}) =>
  async (dispatch: Dispatch<InvoiceTypeAction>) => {
    try {
      dispatch({ type: constants.UPDATE_INVOICE_TYPE_REQUEST, loading: true });
      callbacks.onRequest?.();
      const response = await axios.put<InvoiceType>(
        `/invoiceType/${id}/${localStorage.getItem("userToken")}`,
        data
      );
      dispatch({
        type: constants.UPDATE_INVOICE_TYPE_SUCCESS,
        payload: response.data,
        loading: false,
      });
      callbacks.onSuccess?.(response.data);
    } catch (err) {
      callbacks.onFailure?.(err);
      dispatch({
        type: constants.UPDATE_INVOICE_TYPE_FAILURE,
        payload: err,
        loading: false,
      });
    }
  };

export const getInvoiceType =
  (id: string, callbacks: InvoiceTypeCallbacks = {}) =>
  async (dispatch: Dispatch<InvoiceTypeAction>) => {
    try {
      dispatch({ type: constants.GET_INVOICE_TYPE_REQUEST, loading: true });
      callbacks.onRequest?.();
      if(id) {
        const response = await axios.get<InvoiceType>(
          `/invoiceType/${id}/${localStorage.getItem("userToken")}`
        );
        dispatch({
          type: constants.GET_INVOICE_TYPE_SUCCESS,
          payload: response.data,
          loading: false,
        });
        callbacks.onSuccess?.(response.data);
      } else {
        dispatch({
          type: constants.GET_INVOICE_TYPE_SUCCESS,
          payload: null,
          loading: false,
        });
      }
    } catch (err) {
      callbacks.onFailure?.(err);
      dispatch({
        type: constants.GET_INVOICE_TYPE_FAILURE,
        payload: err,
        loading: false,
      });
    }
  };

export const getPaymentTermsActive =
  (callbacks: PaymentTermsCallbacks) =>
  async (dispatch: Dispatch<PaymentTermsAction>) => {
    try {
      dispatch({
        type: constants.GET_PAYMENT_TERMS_ACTIVE_REQUEST,
        loading: true,
      });
      callbacks.onRequest?.();
      const response = await axios.get<PaymentTerms>(
        `/paymentTerm/${localStorage.getItem("userToken")}/active`
      );
      dispatch({
        type: constants.GET_PAYMENT_TERMS_ACTIVE_SUCCESS,
        payload: response.data,
        loading: false,
      });
      callbacks.onSuccess?.(response.data);
    } catch (err) {
      callbacks.onFailure?.(err);
      dispatch({
        type: constants.GET_PAYMENT_TERMS_ACTIVE_FAILURE,
        payload: err,
        loading: false,
      });
    }
  };

export const getTaxes =
  (callbacks: TaxCallbacks = {}) =>
  async (dispatch: Dispatch<TaxAction>) => {
    try {
      dispatch({ type: constants.GET_TAXES_REQUEST, loading: true });
      callbacks.onRequest?.();
      const response = await axios.get<Taxes>(
        `/tax/${localStorage.getItem("userToken")}`
      );
      dispatch({
        type: constants.GET_TAXES_SUCCESS,
        payload: response.data,
        loading: false,
      });
      callbacks.onSuccess?.(response.data);
    } catch (err) {
      callbacks.onFailure?.(err);
      dispatch({
        type: constants.GET_TAXES_FAILURE,
        payload: err,
        loading: false,
      });
    }
  };

export const getUnits =
  (callbacks: UnitCallbacks = {}) =>
  async (dispatch: Dispatch<UnitAction>) => {
    try {
      dispatch({ type: constants.GET_UNITS_REQUEST, loading: true });
      callbacks.onRequest?.();
      const response = await axios.get<Units>(
        `/unit/${localStorage.getItem("userToken")}`
      );
      dispatch({
        type: constants.GET_UNITS_SUCCESS,
        payload: response.data,
        loading: false,
      });
      callbacks.onSuccess?.(response.data);
    } catch (err) {
      callbacks.onFailure?.(err);
      dispatch({
        type: constants.GET_UNITS_FAILURE,
        payload: err,
        loading: false,
      });
    }
  };

export const getTaxExemptionReasons =
  (callbacks: TaxExemptionReasonCallbacks = {}) =>
  async (dispatch: Dispatch<TaxExemptionReasonAction>) => {
    try {
      dispatch({
        type: constants.GET_TAX_EXEMPTION_REASONS_REQUEST,
        loading: true,
      });
      callbacks.onRequest?.();
      const response = await axios.get<TaxExemptionReasons>(
        `/taxExemptionReason/${localStorage.getItem("userToken")}`
      );
      dispatch({
        type: constants.GET_TAX_EXEMPTION_REASONS_SUCCESS,
        payload: response.data,
        loading: false,
      });
      callbacks.onSuccess?.(response.data);
    } catch (err) {
      callbacks.onFailure?.(err);
      dispatch({
        type: constants.GET_TAX_EXEMPTION_REASONS_FAILURE,
        payload: err,
        loading: false,
      });
    }
  };

export const getSaftProductType =
  (callbacks: SaftTypeCallbacks) =>
  async (dispatch: Dispatch<SaftTypeAction>) => {
    try {
      dispatch({
        type: constants.GET_SAFT_PRODUCT_TYPE_REQUEST,
        loading: true,
      });
      callbacks.onRequest?.();
      const response = await axios.get<SaftTypes>(
        `/saftProductType/${localStorage.getItem("userToken")}`
      );
      dispatch({
        type: constants.GET_SAFT_PRODUCT_TYPE_SUCCESS,
        payload: response.data,
        loading: false,
      });
      callbacks.onSuccess?.(response.data);
    } catch (err) {
      callbacks.onFailure?.(err);
      dispatch({
        type: constants.GET_SAFT_PRODUCT_TYPE_FAILURE,
        payload: err,
        loading: false,
      });
    }
  };

export const getDocumentTypes =
  (callbacks: DocumentTypesCallbacks) =>
  async (dispatch: Dispatch<DocumentTypesAction>) => {
    try {
      dispatch({ type: constants.GET_DOCUMENT_TYPES_REQUEST, loading: true });
      callbacks.onRequest?.();
      const response = await axios.get<DocumentTypes>(
        `/documentType/${localStorage.getItem("userToken")}`
      );
      dispatch({
        type: constants.GET_DOCUMENT_TYPES_SUCCESS,
        payload: response.data,
        loading: false,
      });
      callbacks.onSuccess?.(response.data);
    } catch (err) {
      callbacks.onFailure?.(err);
      dispatch({
        type: constants.GET_DOCUMENT_TYPES_FAILURE,
        payload: err,
        loading: false,
      });
    }
  };
