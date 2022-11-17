import {
  ArticlesCallbacks,
  Articles,
  ArticlesAction,
  ArticleCallbacks,
  ArticleAction,
  Article,
  ArticleRequest,
} from "../types/ArticleTypes";
import constants from "../constants/ArticleConstants";
import axios from "../../config/axios";
import { Dispatch } from "redux";

export const getArticles =
  (callbacks?: ArticlesCallbacks) =>
  async (dispatch: Dispatch<ArticlesAction>) => {
    try {
      dispatch({ type: constants.GET_ARTICLES_REQUEST, loading: true });
      callbacks?.onRequest?.();
      const response = await axios.get<Articles>(
        `/article/${localStorage.getItem("userToken")}`
      );
      dispatch({
        type: constants.GET_ARTICLES_SUCCESS,
        payload: response.data,
        loading: false,
      });
      callbacks?.onSuccess?.(response.data);
    } catch (err) {
      callbacks?.onFailure?.(err);
      dispatch({
        type: constants.GET_ARTICLES_FAILURE,
        payload: err,
        loading: false,
      });
    }
  };
export const deleteArticle =
  (id: number, callbacks?: ArticleCallbacks) =>
  async (dispatch: Dispatch<ArticleAction>) => {
    try {
      dispatch({ type: constants.DELETE_ARTICLE_REQUEST, loading: true });
      callbacks?.onRequest?.();
      const response = await axios.delete(
        `/article/${id}/${localStorage.getItem("userToken")}`
      );
      dispatch({
        type: constants.DELETE_ARTICLE_SUCCESS,
        payload: response.data,
        loading: false,
      });
      callbacks?.onSuccess?.(response.data);
    } catch (err) {
      callbacks?.onFailure?.(err);
      dispatch({
        type: constants.DELETE_ARTICLE_FAILURE,
        payload: err,
        loading: false,
      });
    }
  };

export const addArticle =
  (article: ArticleRequest, callbacks?: ArticleCallbacks) =>
  async (dispatch: Dispatch<ArticleAction>) => {
    try {
      dispatch({ type: constants.ADD_ARTICLE_REQUEST, loading: true });
      callbacks?.onRequest?.();
      const response = await axios.post<Article>(
        `/article/${localStorage.getItem("userToken")}`,
        article
      );
      dispatch({
        type: constants.ADD_ARTICLE_SUCCESS,
        payload: response.data,
        loading: false,
      });
      callbacks?.onSuccess?.(response.data);
    } catch (err) {
      callbacks?.onFailure?.(err);
      dispatch({
        type: constants.ADD_ARTICLE_FAILURE,
        payload: err,
        loading: false,
      });
    }
  };

export const updateArticle =
  (id: number, article: ArticleRequest, callbacks?: ArticleCallbacks) =>
  async (dispatch: Dispatch<ArticleAction>) => {
    try {
      dispatch({ type: constants.UPDATE_ARTICLE_REQUEST, loading: true });
      callbacks?.onRequest?.();
      const response = await axios.put<Article>(
        `/article/${id}/${localStorage.getItem("userToken")}`,
        article
      );
      dispatch({
        type: constants.UPDATE_ARTICLE_SUCCESS,
        payload: response.data,
        loading: false,
      });
      callbacks?.onSuccess?.(response.data);
    } catch (err) {
      callbacks?.onFailure?.(err);
      dispatch({
        type: constants.UPDATE_ARTICLE_FAILURE,
        payload: err,
        loading: false,
      });
    }
  };

export const getArticle =
  (id: number, callbacks?: ArticleCallbacks) =>
  async (dispatch: Dispatch<ArticleAction>) => {
    try {
      dispatch({ type: constants.GET_ARTICLE_REQUEST, loading: true });
      callbacks?.onRequest?.();
      const response = await axios.get<Article>(
        `/article/${id}/${localStorage.getItem("userToken")}`
      );
      dispatch({
        type: constants.GET_ARTICLE_SUCCESS,
        payload: response.data,
        loading: false,
      });
      callbacks?.onSuccess?.(response.data);
    } catch (err) {
      callbacks?.onFailure?.(err);
      dispatch({
        type: constants.GET_ARTICLE_FAILURE,
        payload: err,
        loading: false,
      });
    }
  };
