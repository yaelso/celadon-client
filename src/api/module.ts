import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';

/**
 * The {@link external:https://axios-http.com/docs/api_intro|axios} `.request` method has a complicated and ugly generic
 * constraints configuration. We re-wrap this method to enable setting two such constraints-- the request body type and
 * the response body type-- since we always return the standard Axios response model.
 * @param request - the configuration object for the outbound Axios request
 */

export const sendApiRequest = <TRequestBody = any, TResponseBody = any>(
    request: AxiosRequestConfig<TRequestBody>,
) => axios.request<TResponseBody, AxiosResponse<TResponseBody>, TRequestBody>(request);
