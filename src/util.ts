/**
 * 通用工具。
 */

import * as _jsonBigint from 'json-bigint';

import axios, {
  AxiosError,
  type AxiosRequestConfig,
  type AxiosResponse,
} from 'axios';

const jsonBigint = _jsonBigint({ useNativeBigInt: true });

/**
 * fanbook API 调用失败。
 */
export class FanbookApiError extends Error {
  constructor(
    /**
     * 发生错误的请求。
     */
    public readonly request: AxiosRequestConfig,
    /**
     * 调用结果/错误。
     */
    public readonly response?: AxiosResponse | AxiosError,
  ) {
    super('Failed to call Fanbook OpenAPI');
  }
}

/**
 * API 公共路径。
 */
export const apiBaseUrl = 'https://a1.fanbook.mobi';

/**
 * Axios 请求器实例。
 */
export const requester = axios.create({
  baseURL: apiBaseUrl,
  timeout: 5000,
  // JSON 请求体
  transformRequest: [(data, headers) => {
    if (headers['Content-Type'] === undefined) { // 未指定 Content-Type
      try {
        data = jsonBigint.stringify(data);
        headers['Content-Type'] = 'application/json'; // 解析成功，设置 Content-Type
      } catch (err) {
        // 未知错误
        if (Object(err).name !== 'SyntaxError') throw err;
      }
    }
    return data;
  }],
  // JSON 响应体
  transformResponse: [(data) => {
    try {
      data = jsonBigint.parse(data);
    } catch (err) {
      // 未知错误
      if (Object(err).name !== 'SyntaxError') throw err;
    }
    return data;
  }],
});

/**
 * API 标准返回数据模型。
 */
interface FanbookApiResponse {
  ok?: boolean;
  status?: boolean;
  description?: string;
  result?: unknown;
  data?: unknown;
}
/**
 * 等待 API 请求，不进行校验。
 * @param request Axios 请求
 */
export async function sendWithoutCheck<T, D>(
  request: Promise<AxiosResponse<T, D>>,
): Promise<T> {
  try {
    return (await request).data;
  } catch (err) {
    // 网络服务错误
    if (err instanceof AxiosError) throw new FanbookApiError(err.request, err);
    // 其他的就是未知错误
    console.error(err);
    throw new Error('Unknown error');
  }
}
/**
 * 等待并校验 Fanbook OpenAPI 请求。
 * @param request Axios 请求
 */
export async function send<T extends FanbookApiResponse, D>(
  request: Promise<AxiosResponse<T, D>>,
): Promise<T['result'] | T['data']> {
  const response = await sendWithoutCheck(request);
  const httpResponse = await request; // await 一个已经决议的 Promise 会直接返回
  // 请求校验成功，返回业务数据
  if (response.ok === true) return response.result; // 机器人 API
  if (response.status === true) return response.data; // OAuth2.0 API
  // 请求校验失败，抛出异常
  throw new FanbookApiError(httpResponse.config, httpResponse);
}
