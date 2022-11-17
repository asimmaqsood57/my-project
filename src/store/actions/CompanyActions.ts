/**
 * 1: vatNumber
 * 2: companyName
 * 3: companyAddress
 */

import { Dispatch } from "redux";
import axios from "../../config/axios";
import { Company, CompanyAction, CompanyCallbacks } from "../types/CompanyTypes";
import constants from "../constants/CompanyConstants";
export const getVatNumber = (callbacks: CompanyCallbacks) => async (dispatch: Dispatch<CompanyAction>)=> {
  try {
    dispatch({ type: constants.GET_VAT_NUMBER_REQUEST, loading: true });
    callbacks.onRequest?.();
    const response = await axios.get<Company>(`/setting/1/${localStorage.getItem("userToken")}`);
    dispatch({
      type: constants.GET_VAT_NUMBER_SUCCESS,
      payload: response.data,
      loading: false,
    });
    callbacks.onSuccess?.(response.data);
  } catch (err) {
    callbacks.onFailure?.(err);
    dispatch({
      type: constants.GET_VAT_NUMBER_FAILURE,
      payload: err,
      loading: false,
    });
  }
}

export const getCompany = (callbacks: CompanyCallbacks) => async (dispatch: Dispatch<CompanyAction>)=> {
  try {
    dispatch({ type: constants.GET_COMPANY_NAME_REQUEST, loading: true });
    callbacks.onRequest?.();
    const response = await axios.get<Company>(`/setting/2/${localStorage.getItem("userToken")}`);
    dispatch({
      type: constants.GET_COMPANY_NAME_SUCCESS,
      payload: response.data,
      loading: false,
    });
    callbacks.onSuccess?.(response.data);
  } catch (err) {
    callbacks.onFailure?.(err);
    dispatch({
      type: constants.GET_COMPANY_NAME_FAILURE,
      payload: err,
      loading: false,
    });
  }
}

export const getCompanyShareCapital = (callbacks: CompanyCallbacks) => async (dispatch: Dispatch<CompanyAction>) => {
    try {
        dispatch({ type: constants.GET_COMPANY_NAME_REQUEST, loading: true });
        callbacks.onRequest?.();
        const response = await axios.get<Company>(`/setting/7/${localStorage.getItem("userToken")}`);
        dispatch({
            type: constants.GET_COMPANY_SHARE_CAPITAL_SUCCESS,
            payload: response.data,
            loading: false,
        });
        callbacks.onSuccess?.(response.data);
    } catch (err) {
        callbacks.onFailure?.(err);
        dispatch({
            type: constants.GET_COMPANY_SHARE_CAPITAL_FAILURE,
            payload: err,
            loading: false,
        });
    }
}

export const getCompanyAddress = (callbacks: CompanyCallbacks) => async (dispatch: Dispatch<CompanyAction>)=> {
  try {
    dispatch({ type: constants.GET_COMPANY_ADDRESS_REQUEST, loading: true });
    callbacks.onRequest?.();
    const response = await axios.get<Company>(`/setting/3/${localStorage.getItem("userToken")}`);
    dispatch({
      type: constants.GET_COMPANY_ADDRESS_SUCCESS,
      payload: response.data,
      loading: false,
    });
    callbacks.onSuccess?.(response.data);
  } catch (err) {
    callbacks.onFailure?.(err);
    dispatch({
      type: constants.GET_COMPANY_ADDRESS_FAILURE,
      payload: err,
      loading: false,
    });
  }
}

export const updateVatNumber = (data: { SettingStringValue: string }, callbacks: CompanyCallbacks) => async (dispatch: Dispatch<CompanyAction>)=> {
  try {
    dispatch({ type: constants.UPDATE_VAT_NUMBER_REQUEST, loading: true });
    callbacks.onRequest?.();
    const response = await axios.put<Company>(`/setting/1/${localStorage.getItem("userToken")}`, data);
    dispatch({
      type: constants.UPDATE_VAT_NUMBER_SUCCESS,
      payload: response.data,
      loading: false,
    });
    callbacks.onSuccess?.(response.data);
  } catch (err) {
    callbacks.onFailure?.(err);
    dispatch({
      type: constants.UPDATE_VAT_NUMBER_FAILURE,
      payload: err,
      loading: false,
    });
  }
}