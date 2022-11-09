import axios from "axios";
import { Enviroment } from "../../../environments";
import { responseInterceptor, errorInterceptor } from "./interceptors";

const Api = axios.create({
  baseURL: Enviroment.URL_BASE,
});

Api.interceptors.response.use(
  (response) => responseInterceptor(response),
  (error) => errorInterceptor(error)
);

export { Api };
