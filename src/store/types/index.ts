
export interface Action<T> {
  payload?: T;
  type: string;
  loading: boolean;
  loaded?: boolean;
}

export interface State<T> {
  data?: T;
  error?: any;
  loading: boolean;
  loaded?: boolean;
}

export interface Callbacks<T> {
  onSuccess?: (response: T) => void;
  onFailure?: (error: any) => void;
  onRequest?: () => void;
}