import { initialState } from ".";
import constants from "../constants/DataConstants";
import {
  DocumentTypesAction,
  DocumentTypesState,
  InvoiceTypesAction,
  InvoiceTypesState,
  PaymentTermAction,
  PaymentTermsAction,
  PaymentTermsState,
  PaymentTermState,
  SaftTypeAction,
  SaftTypeState,
  TaxAction,
  TaxExemptionReasonAction,
  TaxExemptionReasonState,
  TaxState,
  UnitAction,
  UnitState,
  InvoiceTypeState,
  InvoiceTypeAction
} from "../types/DataTypes";

export const getPaymentTermsReducer = (
  state: PaymentTermsState = initialState,
  action: PaymentTermsAction
): PaymentTermsState => {
  switch (action.type) {
    case constants.GET_PAYMENT_TERMS_REQUEST:
      return {
        ...state,
        loading: action.loading,
      };
    case constants.GET_PAYMENT_TERMS_SUCCESS:
      return {
        data: action.payload,
        loading: action.loading,
      };
    case constants.GET_PAYMENT_TERMS_FAILURE:
      return {
        error: action.payload,
        loading: action.loading,
      };
    default:
      return state;
  }
};

export const addPaymentTermReducer = (
  state: PaymentTermState = initialState,
  action: PaymentTermAction
): PaymentTermState => {
  switch (action.type) {
    case constants.ADD_PAYMENT_TERM_REQUEST:
      return {
        ...state,
        loading: action.loading,
      };
    case constants.ADD_PAYMENT_TERM_SUCCESS:
      return {
        data: action.payload,
        loading: action.loading,
      };
    case constants.ADD_PAYMENT_TERM_FAILURE:
      return {
        error: action.payload,
        loading: action.loading,
      };
    default:
      return state;
  }
};

export const updatePaymentTermReducer = (
  state: PaymentTermState = initialState,
  action: PaymentTermAction
): PaymentTermState => {
  switch (action.type) {
    case constants.UPDATE_PAYMENT_TERM_REQUEST:
      return {
        ...state,
        loading: action.loading,
      };
    case constants.UPDATE_PAYMENT_TERM_SUCCESS:
      return {
        data: action.payload,
        loading: action.loading,
      };
    case constants.UPDATE_PAYMENT_TERM_FAILURE:
      return {
        error: action.payload,
        loading: action.loading,
      };
    default:
      return state;
  }
};

export const getPaymentTermReducer = (
  state: PaymentTermState = initialState,
  action: PaymentTermAction
): PaymentTermState => {
  switch (action.type) {
    case constants.GET_PAYMENT_TERM_REQUEST:
      return {
        ...state,
        loading: action.loading,
      };
    case constants.GET_PAYMENT_TERM_SUCCESS:
      return {
        data: action.payload,
        loading: action.loading,
      };
    case constants.GET_PAYMENT_TERM_FAILURE:
      return {
        error: action.payload,
        loading: action.loading,
      };
    default:
      return state;
  }
};

export const getInvoiceTypesReducer = (
  state: InvoiceTypesState = initialState,
  action: InvoiceTypesAction
): InvoiceTypesState => {
  switch (action.type) {
    case constants.GET_INVOICE_TYPES_REQUEST:
      return {
        ...state,
        loading: action.loading,
      };
    case constants.GET_INVOICE_TYPES_SUCCESS:
      return {
        data: action.payload,
        loading: action.loading,
      };
    case constants.GET_INVOICE_TYPES_FAILURE:
      return {
        error: action.payload,
        loading: action.loading,
      };
    default:
      return state;
  }
};

export const addInvoiceTypeReducer = (
  state: InvoiceTypeState = initialState,
  action: InvoiceTypeAction
): InvoiceTypeState => {
  switch (action.type) {
    case constants.ADD_INVOICE_TYPE_REQUEST:
      return {
        ...state,
        loading: action.loading,
      };
    case constants.ADD_INVOICE_TYPE_SUCCESS:
      return {
        data: action.payload,
        loading: action.loading,
      };
    case constants.ADD_INVOICE_TYPE_FAILURE:
      return {
        error: action.payload,
        loading: action.loading,
      };
    default:
      return state;
  }
}

export const updateInvoiceTypeReducer = (
  state: InvoiceTypeState = initialState,
  action: InvoiceTypeAction
): InvoiceTypeState => {
  switch (action.type) {
    case constants.UPDATE_INVOICE_TYPE_REQUEST:
      return {
        ...state,
        loading: action.loading,
      };
    case constants.UPDATE_INVOICE_TYPE_SUCCESS:
      return {
        data: action.payload,
        loading: action.loading,
      };
    case constants.UPDATE_INVOICE_TYPE_FAILURE:
      return {
        error: action.payload,
        loading: action.loading,
      };
    default:
      return state;
  }
}

export const getInvoiceTypeReducer = (
  state: InvoiceTypeState = initialState,
  action: InvoiceTypeAction
): InvoiceTypeState => {
  switch (action.type) {
    case constants.GET_INVOICE_TYPE_REQUEST:
      return {
        ...state,
        loading: action.loading,
      };
    case constants.GET_INVOICE_TYPE_SUCCESS:
      return {
        data: action.payload,
        loading: action.loading,
      };
    case constants.GET_INVOICE_TYPE_FAILURE:
      return {
        error: action.payload,
        loading: action.loading,
      };
    default:
      return state;
  }
}


export const getTaxesReducer = (state: TaxState=initialState, action: TaxAction): TaxState => {
  switch (action.type) {
    case constants.GET_TAXES_REQUEST:
      return {
        ...state,
        loading: action.loading,
      };
    case constants.GET_TAXES_SUCCESS:
      return {
        data: action.payload,
        loading: action.loading,
      };
    case constants.GET_TAXES_FAILURE:
      return {
        error: action.payload,
        loading: action.loading,
      };
    default:
      return state;
  }
}

export const getUnitsReducer = (state: UnitState=initialState, action: UnitAction): UnitState => {
  switch (action.type) {
    case constants.GET_UNITS_REQUEST:
      return {
        ...state,
        loading: action.loading,
      };
    case constants.GET_UNITS_SUCCESS:
      return {
        data: action.payload,
        loading: action.loading,
      };
    case constants.GET_UNITS_FAILURE:
      return {
        error: action.payload,
        loading: action.loading,
      };
    default:
      return state;
  }
}

export const getTaxExemptionReasonsReducer = (
  state: TaxExemptionReasonState = initialState,
  action: TaxExemptionReasonAction
): TaxExemptionReasonState => {
  switch (action.type) {
    case constants.GET_TAX_EXEMPTION_REASONS_REQUEST:
      return {
        ...state,
        loading: action.loading,
      };
    case constants.GET_TAX_EXEMPTION_REASONS_SUCCESS:
      return {
        data: action.payload,
        loading: action.loading,
      };
    case constants.GET_TAX_EXEMPTION_REASONS_FAILURE:
      return {
        error: action.payload,
        loading: action.loading,
      };
    default:
      return state;
  }
}

export const getPaymentTermsActiveReducer = (
  state: PaymentTermsState = initialState,
  action: PaymentTermsAction
): PaymentTermsState => {
  switch (action.type) {
    case constants.GET_PAYMENT_TERMS_ACTIVE_REQUEST:
      return {
        ...state,
        loading: action.loading,
      };
    case constants.GET_PAYMENT_TERMS_ACTIVE_SUCCESS:
      return {
        data: action.payload,
        loading: action.loading,
      };
    case constants.GET_PAYMENT_TERMS_ACTIVE_FAILURE:
      return {
        error: action.payload,
        loading: action.loading,
      };
    default:
      return state;
  }
}

export const getSaftProductTypesReducer = (
  state: SaftTypeState = initialState,
  action: SaftTypeAction
): SaftTypeState => {
  switch (action.type) {
    case constants.GET_SAFT_PRODUCT_TYPE_REQUEST:
      return {
        ...state,
        loading: action.loading,
      };
    case constants.GET_SAFT_PRODUCT_TYPE_SUCCESS:
      return {
        data: action.payload,
        loading: action.loading,
      };
    case constants.GET_SAFT_PRODUCT_TYPE_FAILURE:
      return {
        error: action.payload,
        loading: action.loading,
      };
    default:
      return state;
  }
}

export const getDocumentTypesReducer = (
  state: DocumentTypesState = initialState,
  action: DocumentTypesAction
): DocumentTypesState => {
  switch (action.type) {
    case constants.GET_DOCUMENT_TYPES_REQUEST:
      return {
        ...state,
        loading: action.loading,
      };
    case constants.GET_DOCUMENT_TYPES_SUCCESS:
      return {
        data: action.payload,
        loading: action.loading,
      };
    case constants.GET_DOCUMENT_TYPES_FAILURE:
      return {
        error: action.payload,
        loading: action.loading,
      };
    default:
      return state;
  }
}