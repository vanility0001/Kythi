import axios, {Method, AxiosRequestHeaders} from 'axios';

interface requestParams {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body?: any;
  headers?: AxiosRequestHeaders;
}

/**
 * Wrapper for making requests
 * @param {string} url The url to send the request to
 * @param {Method} method The method to use for the request
 * @param {requestParams} params The parameters to send with the request
 * @return {Promise<any>} Axios Response
 */
export function request(
    url: string,
    method: Method,
    {body, headers}: requestParams = {
      body: {},
      headers: {
        'Content-Type': 'application/json',
      },
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<any> {
  return axios({
    method,
    url,
    headers,
    data: body,
  });
}

/**
 * Generates a random string
 * @param {number} length The length of the string returned
 * @return {string} The string generated
 */
export function generateRandomString(length: number): string {
  let text = '';
  const possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}
