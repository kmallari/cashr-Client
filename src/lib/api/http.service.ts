import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { cookies } from "next/headers";
import z, { Schema } from "zod";

import { EHttpMethod, IService } from "./types";

class HttpService {
  private http: AxiosInstance;
  private baseURL = process.env.NEXT_PUBLIC_API_DOMAIN;

  constructor() {
    this.http = axios.create({
      baseURL: this.baseURL,
      withCredentials: false,
      headers: this.setupHeaders(),
    });
  }

  // Get authorization token for requests
  private get getAuthorization() {
    try {
      const sAccessToken = cookies().get("sAccessToken");
      const sFrontToken = cookies().get("sFrontToken");
      return sAccessToken && sFrontToken
        ? {
            Cookie: `${sAccessToken.name}=${sAccessToken.value};${sFrontToken.name}=${sFrontToken.value}`,
          }
        : {};
    } catch (err) {
      return {};
    }
  }

  // Initialize service configuration
  public service() {
    this.injectInterceptors();
    return this;
  }

  // Set up request headers
  private setupHeaders(hasAttachment = false) {
    return hasAttachment
      ? { "Content-Type": "multipart/form-data", ...this.getAuthorization }
      : { "Content-Type": "application/json", ...this.getAuthorization };
  }

  private validateResponse<T extends Schema>(
    response: AxiosResponse<T>,
    schema: T,
  ) {
    schema.parse(response.data);
  }

  // Handle HTTP requests
  private async request<T extends Schema>(
    method: EHttpMethod,
    url: string,
    responseSchema: T,
    options: AxiosRequestConfig,
  ): Promise<z.infer<T>> {
    try {
      const response: AxiosResponse<T> = await this.http.request<T>({
        method,
        url,
        ...options,
      });
      this.validateResponse(response, responseSchema);
      return response.data;
    } catch (error) {
      return this.normalizeError(error);
    }
  }

  // Perform GET request
  public async get<T extends Schema>(
    url: string,
    responseSchema: T,
    params?: IService.IParams,
    hasAttachment = false,
  ): Promise<z.infer<T>> {
    return this.request<T>(EHttpMethod.GET, url, responseSchema, {
      params,
      headers: this.setupHeaders(hasAttachment),
    });
  }

  // Perform POST request
  public async post<T extends Schema, P>(
    url: string,
    payload: P,
    responseSchema: T,
    params?: IService.IParams,
    hasAttachment = false,
  ): Promise<z.infer<T>> {
    return this.request<T>(EHttpMethod.POST, url, responseSchema, {
      params,
      data: payload,
      headers: this.setupHeaders(hasAttachment),
    });
  }

  // Perform UPDATE request
  public async put<T extends Schema, P>(
    url: string,
    payload: P,
    responseSchema: T,
    params?: IService.IParams,
    hasAttachment = false,
  ): Promise<z.infer<T>> {
    return this.request<T>(EHttpMethod.PUT, url, responseSchema, {
      params,
      data: payload,
      headers: this.setupHeaders(hasAttachment),
    });
  }

  // Perform DELETE request
  public async delete<T extends Schema>(
    url: string,
    responseSchema: T,
    params?: IService.IParams,
    hasAttachment = false,
  ): Promise<z.infer<T>> {
    return this.request<T>(EHttpMethod.DELETE, url, responseSchema, {
      params,
      headers: this.setupHeaders(hasAttachment),
    });
  }

  // Inject interceptors for request and response
  private injectInterceptors() {
    // Set up request interceptor
    this.http.interceptors.request.use((request) => {
      // * Perform an action
      // TODO: implement an NProgress
      return request;
    });

    // Set up response interceptor
    this.http.interceptors.response.use(
      (response) => {
        // * Do something
        return response;
      },

      (error) => {
        // * Implement a global error alert
        return Promise.reject(error);
      },
    );
  }

  // Normalize errors
  private normalizeError(error: unknown) {
    return Promise.reject(error);
  }
}

const httpService = new HttpService();

export { HttpService };
export default httpService;
