import { initialState } from ".";
import { CompanyAction, CompanyState } from "../types/CompanyTypes";
import constants from "../constants/CompanyConstants";

/**
 * 1: vatNumber
 * 2: companyName
 * 3: companyAddress
 */


export const getVatNumberReducer = (state: CompanyState=initialState, action: CompanyAction) => {
  switch (action.type) {
    case constants.GET_VAT_NUMBER_REQUEST:
      return {
        ...state,
        loading: action.loading,
      };
    case constants.GET_VAT_NUMBER_SUCCESS:
      return {
        data: action.payload,
        loading: action.loading,
      };
    case constants.GET_VAT_NUMBER_FAILURE:
      return {
        error: action.payload,
        loading: action.loading,
      };
    default:
      return state;
  }
};

export const getCompanyNameReducer = (state: CompanyState=initialState, action: CompanyAction) => {
  switch (action.type) {
    case constants.GET_COMPANY_NAME_REQUEST:
      return {
        ...state,
        loading: action.loading,
      };
    case constants.GET_COMPANY_NAME_SUCCESS:
      return {
        data: action.payload,
        loading: action.loading,
      };
    case constants.GET_COMPANY_NAME_FAILURE:
      return {
        error: action.payload,
        loading: action.loading,
      };
    default:
      return state;
  }
};

export const getCompanyShareCapitalReducer = (state: CompanyState = initialState, action: CompanyAction) => {
    switch (action.type) {
        case constants.GET_COMPANY_SHARE_CAPITAL_REQUEST:
            return {
                ...state,
                loading: action.loading,
            };
        case constants.GET_COMPANY_SHARE_CAPITAL_SUCCESS:
            return {
                data: action.payload,
                loading: action.loading,
            };
        case constants.GET_COMPANY_SHARE_CAPITAL_FAILURE:
            return {
                error: action.payload,
                loading: action.loading,
            };
        default:
            return state;
    }
};

export const getCompanyAddressReducer = (state: CompanyState=initialState, action: CompanyAction) => {
  switch (action.type) {
    case constants.GET_COMPANY_ADDRESS_REQUEST:
      return {
        ...state,
        loading: action.loading,
      };
    case constants.GET_COMPANY_ADDRESS_SUCCESS:
      return {
        data: action.payload,
        loading: action.loading,
      };
    case constants.GET_COMPANY_ADDRESS_FAILURE:
      return {
        error: action.payload,
        loading: action.loading,
      };
    default:
      return state;
  }
}