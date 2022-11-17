import { Action, Callbacks, State } from ".";

export interface LoginResponse {
  id: string;
  name: string;
  token?: string;
  state: string;
  profilePicture: string;
}
export interface Login {
  Email: string;
  Password: string;
}
export type LoginAction = Action<LoginResponse>; 
export type LoginState = State<LoginResponse>;
export type LoginCallbacks = Callbacks<LoginResponse>;

export interface RecoverResponse {
  id: string;
}
export interface Recover {
  Email: string;
}
export type RecoverAction = Action<RecoverResponse>;
export type RecoverState = State<RecoverResponse>;
export type RecoverCallbacks = Callbacks<RecoverResponse>;

export interface User {
  active: boolean;
  email: string;
  fullname: string;
  id: number;
  phone: string;
  profile: string;
  username: string;
}
export type UserAction = Action<User>;
export type UserState = State<User>;
export type UserCallbacks = Callbacks<User>;

export type Users = User[];
export type UsersAction = Action<Users>;
export type UsersState = State<Users>;
export type UsersCallbacks = Callbacks<Users>;


export interface UserRequest {
    fullname: string;
    email: string;
    profileID?: number;
}