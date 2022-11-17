import { toast } from "react-toastify";
import { Dispatch } from "redux";
import axios from "../../config/axios";
import { Login, LoginAction, LoginCallbacks, LoginResponse, RecoverAction, RecoverCallbacks, RecoverResponse, Users, UsersAction, UserAction, UsersCallbacks, UserRequest, User , UserCallbacks} from "../types/UserTypes";
import constants from "../constants/UserConstants";

export const login =
    (data: Login, callbacks: LoginCallbacks) =>
        async (dispatch: Dispatch<LoginAction>) => {
            try {
                dispatch({ type: constants.LOGIN_REQUEST, loading: true });
                callbacks.onRequest?.();
                const response = await axios.post<LoginResponse>("/login", data);
                dispatch({
                    type: constants.LOGIN_SUCCESS,
                    payload: response.data,
                    loading: false,
                });
                callbacks.onSuccess?.(response.data);
            } catch (err: any) {
                callbacks.onFailure?.(err);
                dispatch({
                    type: constants.LOGIN_FAILURE,
                    payload: err,
                    loading: false,
                });
            }
        };
export const recover =
    (data: { Email: string }, callbacks: RecoverCallbacks) =>
        async (dispatch: Dispatch<RecoverAction>) => {
            try {
                callbacks.onRequest?.();
                dispatch({ type: constants.RECOVER_REQUEST, loading: true });
                const response = await axios.post<RecoverResponse>("/user/recover", data);
                dispatch({
                    type: constants.RECOVER_SUCCESS,
                    payload: response.data,
                    loading: false,
                });
                callbacks.onSuccess?.(response.data);
            } catch (err: any) {
                callbacks.onFailure?.(err);
                toast.error(err?.message);
                dispatch({
                    type: constants.RECOVER_FAILURE,
                    payload: err,
                    loading: false,
                });
            }
        };

export const getUsers = (callbacks: UsersCallbacks) => async (dispatch: Dispatch<UsersAction>) => {
    try {
        dispatch({ type: constants.GET_USERS_REQUEST, loading: true });
        callbacks.onRequest?.();
        const response = await axios.get<Users>(`/users/${localStorage.getItem("userToken")}`);
        dispatch({
            type: constants.GET_USERS_SUCCESS,
            payload: response.data,
            loading: false,
        });
        callbacks.onSuccess?.(response.data);
    } catch (err) {
        callbacks.onFailure?.(err);
        dispatch({
            type: constants.GET_USERS_FAILURE,
            payload: err,
            loading: false,
        });
    }
}


export const getUser = (id: string, callbacks: UserCallbacks) => async (dispatch: Dispatch<UserAction>) => {
    try {
        dispatch({ type: constants.GET_USERS_REQUEST, loading: true });
        callbacks.onRequest?.();
        const response = await axios.get<User>(`/user/${id}/${localStorage.getItem("userToken")}`);
        dispatch({
            type: constants.GET_USER_SUCCESS,
            payload: response.data,
            loading: false,
        });
        callbacks.onSuccess?.(response.data);
    } catch (err) {
        callbacks.onFailure?.(err);
        dispatch({
            type: constants.GET_USER_FAILURE,
            payload: err,
            loading: false,
        });
    }
}


export const addUser = (user: UserRequest, callbacks: UserCallbacks) => async (dispatch: Dispatch<UserAction>) => {
    try {
        dispatch({ type: constants.ADD_USER_REQUEST, loading: true });
        callbacks.onRequest?.();
        const response = await axios.post<User>(`/user/${localStorage.getItem("userToken")}`, user);
        callbacks.onSuccess?.(response.data);
        dispatch({
            type: constants.ADD_USER_SUCCESS,
            payload: response.data,
            loading: false,
        });
    } catch (err) {
        callbacks.onFailure?.(err);
        dispatch({
            type: constants.ADD_USER_FAILURE,
            payload: err,
            loading: false,
        });
    }
}

export const updateUser = (customer: UserRequest, id: string, callbacks: UserCallbacks) => async (dispatch: Dispatch<UserAction>) => {
    try {
        dispatch({ type: constants.UPDATE_USER_REQUEST, loading: true });
        callbacks.onRequest?.();
        const response = await axios.put<User>(`/user/${id}/${localStorage.getItem("userToken")}`, customer);
        callbacks.onSuccess?.(response.data);
        dispatch({
            type: constants.UPDATE_USER_SUCCESS,
            payload: response.data,
            loading: false,
        });
    } catch (err) {
        callbacks.onFailure?.(err);
        dispatch({
            type: constants.UPDATE_USER_FAILURE,
            payload: err,
            loading: false,
        });
    }
}