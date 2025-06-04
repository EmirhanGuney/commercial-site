import publicInstance from "../publicInstance.js";
import instance from "../axiosInstance.js";
import { API_URL } from "../../../config/apiUrls.js";
import { handleApiError } from "../apiResponseHandler.js";
import { toast } from "react-toastify";
import { TokenService } from "../../auth/TokenService.js";

export const login = async (email, password) => {
    try {
        const response = await publicInstance.post(
            API_URL.AUTH.LOGIN,
            {
                email,
                password,
            }
        );
        if (response.status === 200) {
            const result = response.data;
            TokenService.setAccessToken(result.data.accessToken);
            toast.success("Giriş Başarılı");
            return true;
        }
        return false;
    } catch (error) {
        console.log(error);
        if (error.response?.status === 401) {
            toast.warning("Hesabınızın doğrulanması gerekmektedir.");
            return false;
        }
        toast.error("Kullanıcı Adı veya Şifre Hatalı");
        return false;
    }
};

export const adminLogin = async (username, password) => {
    try {
        const response = await publicInstance.post(
            API_URL.AUTH.ADMIN_LOGIN,
            {
                username,
                password,
            }
        );
        if (response.status === 200) {
            const result = response.data;
            TokenService.setAccessToken(result.data.accessToken);
            toast.success("Giriş Başarılı");
            return true;
        }
        return false;
    } catch (error) {
        console.log(error);
        toast.error("Kullanıcı Adı veya Şifre Hatalı");
        return false;
    }
};

export const registerCustomer = async (name, phoneNumber, email, password) => {
    try {
        const response = await publicInstance.post(API_URL.AUTH.REGİSTER_CUSTOMER, {
            fullName: name,
            email,
            password,
            phoneNumber,
        });

        if (response.status === 204) {
            toast.success("Kayıt Başarılı");
            return true;
        }

        toast.error("Kayıt Başarısız");
        return false;
    } catch (error) {
        handleApiError(error, "Kayıt Başarısız");
        return false;
    }
};

export const registerCompany = async (
    email,
    password,
    companyName,
    companyType,
    taxNumber,
    phoneNumber
) => {
    try {
        const response = await publicInstance.post(API_URL.AUTH.REGİSTER_COMPANY, {
            email,
            password,
            companyName,
            companyType,
            taxNumber,
            phoneNumber,
        });
        if (response.status === 204) {
            toast.success("Kayıt Başarılı");
            return true;
        }
        toast.error("Kayıt Başarısız");
        return false;
    } catch (error) {
        handleApiError(error, "Kayıt Başarısız");
        return false;
    }
};

export const logout = () => {
    localStorage.removeItem("accessToken");
};

// export const refreshToken = async () => {
//     try {
//         const token = getFromLocalStorage("accessToken");
//         const decoded = jwtDecode(token);
//         const email = decoded?.email;

//         const response = await axios.post(
//             API_URL.AUTH.REFRESH_TOKEN,
//             {
//                 email,
//             },
//             {
//                 withCredentials: true,
//             }
//         );
//         if (response.status === 200) {
//             const result = response.data;
//             addToLocalStorage("accessToken", result.data.accessToken);
//             toast.success("Token yenilendi");
//             return true;
//         }
//         return false;
//     } catch (error) {
//         return false;
//     }
// };