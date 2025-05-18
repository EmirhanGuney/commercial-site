import { decodeToken } from "../../utils/decodeToken.js";
import { addToLocalStorage, getFromLocalStorage } from "../../utils/localStorageHelper.js";
import { decryptToken, encryptToken } from "../../utils/tokenCryptoHelper.js";


export class TokenService {
    static getAccessToken() {
      const tokenFromLocalStorage = getFromLocalStorage("accessToken");
      const token = decryptToken(tokenFromLocalStorage);
      return token;
    }

    static setAccessToken(token) {
      const tokenEncrypt = encryptToken(token);
      addToLocalStorage("accessToken", tokenEncrypt);
    }
  
    static getUserRole() {
      const token = this.getAccessToken();
      const decoded = decodeToken(token);
      return decoded?.role || null;
    }

    static getUserEmail() {
      const token = this.getAccessToken();
      const decoded = decodeToken(token);
      return decoded?.email || null;
    }
  
    static isTokenExpired(token) {
      const decoded = decodeToken(token);
      if (!decoded) return true;
  
      const now = Date.now() / 1000;
      return decoded.exp < now;
    }
  }