import axios from "axios";
import { createBrowserHistory } from "history";
import { API_URL, BASE_URL } from "../../config/apiUrls.js";
import { TokenService } from "../auth/TokenService.js";
import { toast } from "react-toastify";
import { gotTo } from "../services/navigationService.js";


const history = createBrowserHistory();

const instance = axios.create({
    baseURL: BASE_URL,
    withCredentials: true
});

instance.interceptors.request.use(async (config) => {
    let token = TokenService.getAccessToken();

    if (token) {
        const isExp = TokenService.isTokenExpired(token);
        if (isExp) {
            const email = TokenService.getUserEmail();
            try {
                const response = await axios.post(
                    `${BASE_URL}/${API_URL.AUTH.REFRESH_TOKEN}`,
                    { email }, { withCredentials: true }
                );
                token = response.data.data.accessToken;
                TokenService.setAccessToken(token);
            } catch (err) {
                // refreshToken da expired ise burada yakalanabilir
                localStorage.clear();
                toast.warning("Lütfen tekrar giriş yapın.");
                gotTo("/");
                return Promise.reject(err);
            }
        }

        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

instance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.clear();
            toast.warning("Lütfen tekrar giriş yapınız.");
            gotTo("/");
        }

        return Promise.reject(error);
    }
);

export default instance;
