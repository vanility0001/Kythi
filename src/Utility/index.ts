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

export function generateRandomString(length: number): string {
  let text = "";
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}