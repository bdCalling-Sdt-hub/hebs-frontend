import { BaseQueryApi } from "@reduxjs/toolkit/query";

export type TBook ={
  _id:string;
 
  price:number;
  category:string;
  image:string;
  description:string;
  quantity:number;
  inStock:boolean;

}
export  type TUsers = {
_id:string;
name:string;
email:string;
role:string;
status:string;
}

export type TError = {
    data: {
      message: string;
      stack: string;
      success: boolean;
    };
    status: number;
  };
  export type TMeta = {
    limit: number;
    page: number;
    total: number;
    totalPage: number;
  };
  export type TResponse<T> = {
    data?: {
        result: T; 
        meta?: TMeta;
      };
  error?: TError;
  meta?: TMeta;
  success: boolean;
  message: string;
};

export type TResponseRedux<T> = TResponse<T> & BaseQueryApi;

export type TQueryParam = {
  name: string;
  value: boolean | React.Key;
};
