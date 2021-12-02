import axios, { Method } from "axios";

interface requestParams {
    body?: any;
    headers?: any;
}

export function request(
  url: string,
  method: Method,
  { body, headers }: requestParams = {
    body: {},
    headers: {
      "Content-Type": "application/json",
    },
  }
): Promise<any> {
  return axios({
    method,
    url,
    headers,
    data: body,
  });
}
