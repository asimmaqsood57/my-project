import { initialState } from ".";
import { ArticleAction, ArticlesAction, ArticlesState, ArticleState } from "../types/ArticleTypes";
import constants from "../constants/ArticleConstants";
export const getArticlesReducer = (
  state: ArticlesState = initialState,
  action: ArticlesAction
):ArticlesState => {
  switch (action.type) {
    case constants.GET_ARTICLES_REQUEST:
      return {
        ...state,
        loading: action.loading,
      };
    case constants.GET_ARTICLES_SUCCESS:
      return {
        data: action.payload,
        loading: action.loading,
      };
    case constants.GET_ARTICLES_FAILURE:
      return {
        error: action.payload,
        loading: action.loading,
      };
    default:
      return state;
  }
};

export const deleteArticleReducer = (
  state: ArticleState = initialState,
  action: ArticleAction
):ArticleState => {
  switch (action.type) {
    case constants.DELETE_ARTICLE_REQUEST:
      return {
        ...state,
        loading: action.loading,
      };
    case constants.DELETE_ARTICLE_SUCCESS:
      return {
        data: action.payload,
        loading: action.loading,
      };
    case constants.DELETE_ARTICLE_FAILURE:
      return {
        error: action.payload,
        loading: action.loading,
      };
    default:
      return state;
  }
}

export const addArticleReducer = (
  state: ArticleState = initialState,
  action: ArticleAction
):ArticleState => {
  switch (action.type) {
    case constants.ADD_ARTICLE_REQUEST:
      return {
        ...state,
        loading: action.loading,
      };
    case constants.ADD_ARTICLE_SUCCESS:
      return {
        data: action.payload,
        loading: action.loading,
      };
    case constants.ADD_ARTICLE_FAILURE:
      return {
        error: action.payload,
        loading: action.loading,
      };
    default:
      return state;
  }
}

export const getArticleReducer = (
  state: ArticleState = initialState,
  action: ArticleAction
):ArticleState => {
  switch (action.type) {
    case constants.GET_ARTICLE_REQUEST:
      return {
        ...state,
        loading: action.loading,
      };
    case constants.GET_ARTICLE_SUCCESS:
      return {
        data: action.payload,
        loading: action.loading,
      };
    case constants.GET_ARTICLE_FAILURE:
      return {
        error: action.payload,
        loading: action.loading,
      };
    default:
      return state;
  }
}

export const updateArticleReducer = (
  state: ArticleState = initialState,
  action: ArticleAction
):ArticleState => {
  switch (action.type) {
    case constants.UPDATE_ARTICLE_REQUEST:
      return {
        ...state,
        loading: action.loading,
      };
    case constants.UPDATE_ARTICLE_SUCCESS:
      return {
        data: action.payload,
        loading: action.loading,
      };
    case constants.UPDATE_ARTICLE_FAILURE:
      return {
        error: action.payload,
        loading: action.loading,
      };
    default:
      return state;
  }
}