import { LoginAction, LoginState, RecoverState, UsersState, UserState ,UsersAction, UserAction} from "../types/UserTypes";
import constants from "../constants/UserConstants";
import { initialState } from ".";

export const loginReducer = (state:LoginState=initialState, action:LoginAction):LoginState => {
  switch (action.type) {
    case constants.LOGIN_REQUEST:
      return {
        data: action.payload,
        loading: action.loading,
      };
    case constants.LOGIN_SUCCESS: 
      return {
        data: action.payload,
        loading: action.loading,
      };
    case constants.LOGIN_FAILURE:
      return {
        error: action.payload,
        loading: action.loading,
      };
    default:
      return state;
  }
}

export const recoverReducer = (state:RecoverState = initialState, action:LoginAction):RecoverState => {
  switch (action.type) {
    case constants.RECOVER_REQUEST:
      return {
        data: action.payload,
        loading: action.loading,
      };
    case constants.RECOVER_SUCCESS: 
      return {
        data: action.payload,
        loading: action.loading,
      };
    case constants.RECOVER_FAILURE:
      return {
        error: action.payload,
        loading: action.loading,
      };
    default:
      return state;
  }
}

export const getUsersReducer = (state:UsersState = initialState, action:UsersAction):UsersState => {
  switch (action.type) {
    case constants.GET_USERS_REQUEST:
      return {
        data: [],
        loading: action.loading,
      };
    case constants.GET_USERS_SUCCESS: 
      return {
        data: action.payload,
        loading: action.loading,
      };
    case constants.GET_USERS_FAILURE:
      return {
        error: action.payload,
        loading: action.loading,
      };
    default:
      return state;
  }
}


export const getUserReducer = (state: UserState = initialState, action: UserAction) => {
    switch (action.type) {
        case constants.GET_USER_REQUEST:
            return {
                ...state,
                loading: action.loading,
            };
        case constants.GET_USER_SUCCESS:
            return {
                data: action.payload,
                loading: action.loading,
            };
        case constants.GET_USER_FAILURE:
            return {
                error: action.payload,
                loading: action.loading,
            };
        default:
            return state;
    }
}


export const addUserReducer = (state: UsersState = initialState, action: UsersAction) => {
    switch (action.type) {
        case constants.ADD_USER_REQUEST:
            return {
                loading: action.loading,
            };
        case constants.ADD_USER_SUCCESS:
            return {
                data: action.payload,
                loading: action.loading,
            };
        case constants.ADD_USER_FAILURE:
            return {
                error: action.payload,
                loading: action.loading,
            };
        default:
            return state;
    }
}


export const updateUserReducer = (state: UsersState = initialState, action: UsersAction) => {
    switch (action.type) {
        case constants.UPDATE_USER_REQUEST:
            return {
                loading: action.loading,
            };
        case constants.UPDATE_USER_SUCCESS:
            return {
                data: action.payload,
                loading: action.loading,
            };
        case constants.UPDATE_USER_FAILURE:
            return {
                error: action.payload,
                loading: action.loading,
            };
        default:
            return state;
    }
}
