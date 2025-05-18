import axios from "axios";
import { BASE_URL } from "../../config/apiUrls.js";
import { TokenService } from "../auth/TokenService.js";

const publicInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

publicInstance.interceptors.request.use(async (config) => {
  let token = TokenService.getAccessToken();

  config.headers.Authorization = `Bearer ${token}`;

  return config;
});

export default publicInstance;