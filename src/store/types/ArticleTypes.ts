import { Action, Callbacks, State } from ".";


/**
 * Reference: reference,
      Description: description,
      Active: active == "" ? false : true,
      Serializable: serializable == "" ? false : true,
      IsService: isService == "" ? false : true,
      SaftProductTypeID: saftTypeSelected.id,
 */
export interface ArticleRequest {
  Reference: string;
  Description: string;
  Active: boolean | null;
  Serializable: boolean;
  IsService: boolean;
  SaftProductTypeID: number;
}


export interface Article {
  active: boolean | null;
  creationDate: string;
  creationUser: string;
  description: string;
  id: number;
  isService: boolean;
  reference: string;
  saftProductTypeID: number | null;
  serializable: boolean;
}
export type ArticleAction = Action<Article>;
export type ArticleState = State<Article>;
export type ArticleCallbacks = Callbacks<Article>;

export type Articles = Article[];
export type ArticlesAction = Action<Articles>;
export type ArticlesState = State<Articles>;
export type ArticlesCallbacks = Callbacks<Articles>;