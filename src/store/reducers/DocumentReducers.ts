import { DocumentAction, DocumentsAction, DocumentsState, DocumentState } from "../types/DocumentTypes";
import constants from "../constants/DocumentConstants";
import { initialState } from ".";
export const getDocumentsReducer = (state: DocumentsState=initialState, action: DocumentsAction) => {
  switch (action.type) {
    case constants.GET_DOCUMENTS_REQUEST:
      return {
        ...state,
        loading: action.loading,
      };
    case constants.GET_DOCUMENTS_SUCCESS:
      return {
        data: action.payload,
        loading: action.loading,
      };
    case constants.GET_DOCUMENTS_FAILURE:
      return {
        error: action.payload,
        loading: action.loading,
      };
    default:
      return state;
  }
}

export const addDocumentReducer = (state: DocumentState=initialState, action: DocumentAction) => {
  switch (action.type) {
    case constants.ADD_DOCUMENT_REQUEST:
      return {
        ...state,
        loading: action.loading,
      };
    case constants.ADD_DOCUMENT_SUCCESS:
      return {
        data: action.payload,
        loading: action.loading,
      };
    case constants.ADD_DOCUMENT_FAILURE:
      return {
        error: action.payload,
        loading: action.loading,
      };
    default:
      return state;
  }
};

export const updateDocumentReducer = (state: DocumentState=initialState, action: DocumentAction) => {
  switch (action.type) {
    case constants.UPDATE_DOCUMENT_REQUEST:
      return {
        ...state,
        loading: action.loading,
      };
    case constants.UPDATE_DOCUMENT_SUCCESS:
      return {
        data: action.payload,
        loading: action.loading,
      };
    case constants.UPDATE_DOCUMENT_FAILURE:
      return {
        error: action.payload,
        loading: action.loading,
      };
    default:
      return state;
  }
}

export const deleteDocumentReducer = (state: DocumentState=initialState, action: DocumentAction) => {
  switch (action.type) {
    case constants.DELETE_DOCUMENT_REQUEST:
      return {
        ...state,
        loading: action.loading,
      };
    case constants.DELETE_DOCUMENT_SUCCESS:
      return {
        data: action.payload,
        loading: action.loading,
      };
    case constants.DELETE_DOCUMENT_FAILURE:
      return {
        error: action.payload,
        loading: action.loading,
      };
    default:
      return state;
  }
};

export const getDocumentReducer = (state: DocumentState=initialState, action: DocumentAction) => {
  switch (action.type) {
    case constants.GET_DOCUMENT_REQUEST:
      return {
        loading: action.loading,
      };
    case constants.GET_DOCUMENT_SUCCESS:
      return {
        data: action.payload,
        loading: action.loading,
      };
    case constants.GET_DOCUMENT_FAILURE:
      return {
        error: action.payload,
        loading: action.loading,
      };
    default:
      return state;
  }
}