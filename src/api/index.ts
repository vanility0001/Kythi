import axios, { AxiosRequestHeaders, Method } from "axios";

interface requestParams {
  body?: any;
  headers?: AxiosRequestHeaders;
}

export default class API {
  private static async request(
    url: string,
    method: Method,
    { body, headers }: requestParams
  ): Promise<any> {
    return axios({
      url: `${process.env.BACKEND_URL}${url}`,
      method,
      headers,
      data: body,
      withCredentials: true,
    });
  }

  public static async register(
    username: string,
    email: string,
    password: string,
    inviteCode: string
  ): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await this.request("/auth/register", "POST", {
          body: {
            username,
            email,
            password,
            inviteCode,
          },
        });

        resolve(response.data);
      } catch (err) {
        const jsonErr = err.toJSON();
        err.response?.data ? jsonErr.data = err.response.data : null;
        reject(jsonErr)
      }
    });
  }
}
