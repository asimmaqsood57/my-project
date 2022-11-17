import { Dispatch } from "redux";
import axios from "../../config/axios";
import {
  Document,
  DocumentAction,
  DocumentCallbacks,
  DocumentRequest,
  Documents,
  DocumentsAction,
  DocumentsCallbacks,
} from "../types/DocumentTypes";
import constants from "../constants/DocumentConstants";
export const getDocuments =
  (callbacks: DocumentsCallbacks) =>
  async (dispatch: Dispatch<DocumentsAction>) => {
    try {
      dispatch({ type: constants.GET_DOCUMENTS_REQUEST, loading: true });
      callbacks.onRequest?.();
      const response = await axios.get<Documents>(
        `/document/${localStorage.getItem("userToken")}`
      );
      dispatch({
        type: constants.GET_DOCUMENTS_SUCCESS,
        payload: response.data,
        loading: false,
      });
      callbacks.onSuccess?.(response.data);
    } catch (err) {
      callbacks.onFailure?.(err);
      dispatch({
        type: constants.GET_DOCUMENTS_FAILURE,
        payload: err,
        loading: false,
      });
    }
  };

export const addDocument =
  (mLink: string, data: DocumentRequest, callbacks: DocumentCallbacks) =>
  async (dispatch: Dispatch<DocumentAction>) => {
    try {
      dispatch({ type: constants.ADD_DOCUMENT_REQUEST, loading: true });
      callbacks.onRequest?.();
      const response = await axios.post<Document>(
        `/${mLink}/${localStorage.getItem("userToken")}`,
        data
      );
      dispatch({
        type: constants.ADD_DOCUMENT_SUCCESS,
        payload: response.data,
        loading: false,
      });
      callbacks.onSuccess?.(response.data);
    } catch (err) {
      callbacks.onFailure?.(err);
      dispatch({
        type: constants.ADD_DOCUMENT_FAILURE,
        payload: err,
        loading: false,
      });
    }
  };

export const updateDocument =
  (
    mLink: string,
    id: number,
    data: DocumentRequest,
    callbacks: DocumentCallbacks
  ) =>
  async (dispatch: Dispatch<DocumentAction>) => {
    try {
      dispatch({ type: constants.UPDATE_DOCUMENT_REQUEST, loading: true });
      callbacks.onRequest?.();
      const response = await axios.put<Document>(
        `/${mLink}/${id}/${localStorage.getItem("userToken")}`,
        data
      );
      dispatch({
        type: constants.UPDATE_DOCUMENT_SUCCESS,
        payload: response.data,
        loading: false,
      });
      callbacks.onSuccess?.(response.data);
    } catch (err) {
      callbacks.onFailure?.(err);
      dispatch({
        type: constants.UPDATE_DOCUMENT_FAILURE,
        payload: err,
        loading: false,
      });
    }
  };

export const deleteDocument =
  (id: number, callbacks: DocumentCallbacks) =>
  async (dispatch: Dispatch<DocumentAction>) => {
    try {
      dispatch({ type: constants.DELETE_DOCUMENT_REQUEST, loading: true });
      callbacks.onRequest?.();
      const res = await axios.delete<Document>(
        `/document/${id}/${localStorage.getItem("userToken")}`
      );
      dispatch({
        type: constants.DELETE_DOCUMENT_SUCCESS,
        payload: res.data,
        loading: false,
      });
      callbacks.onSuccess?.(res.data);
    } catch (err) {
      callbacks.onFailure?.(err);
      dispatch({
        type: constants.DELETE_DOCUMENT_FAILURE,
        payload: err,
        loading: false,
      });
    }
  };

export const getDocument =
  (id: number, callbacks: DocumentCallbacks) =>
  async (dispatch: Dispatch<DocumentAction>) => {
    try {
      dispatch({ type: constants.GET_DOCUMENT_REQUEST, loading: true });
      callbacks.onRequest?.();
      if (id > 0) {
        const token = localStorage.getItem("userToken");
        const response = await axios.get<Document>(`/document/${id}/${token}`);
        dispatch({
          type: constants.GET_DOCUMENT_SUCCESS,
          payload: response.data,
          loading: false,
        });
        callbacks.onSuccess?.(response.data);
      } else {
        dispatch({
          type: constants.GET_DOCUMENT_SUCCESS,
          payload: null,
          loading: false,
        })
      }
    } catch (err) {
      callbacks.onFailure?.(err);
      dispatch({
        type: constants.GET_DOCUMENT_FAILURE,
        payload: err,
        loading: false,
      });
    }
  };
