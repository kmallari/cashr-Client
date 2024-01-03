export interface IParams {
  [key: string]: unknown;
}

export interface IGenericOptions {
  url: string;
  params?: IParams;
}

export interface IErrorResponse {
  // *This can depending on your backend server error response
  status: string;
  details: string;
}
