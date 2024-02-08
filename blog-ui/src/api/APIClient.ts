import Axios, {
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

export default class APIClient {
  readonly baseURL: string;
  readonly axios: AxiosInstance;

  constructor(baseURL?: string) {
    this.baseURL = baseURL || (process.env.APP_API_URL as string);

    this.axios = Axios.create({
      baseURL: `${this.baseURL}/api`,
      headers: {
        "Content-Type": "application/json",
      },
    });

    this.axios.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        return config;
      },
    );

    this.axios.interceptors.response.use((response: AxiosResponse) => {
      return response;
    });
  }

  callApi({ method = "GET", ...rest }) {
    return this.axios({ method, ...rest });
  }
}
