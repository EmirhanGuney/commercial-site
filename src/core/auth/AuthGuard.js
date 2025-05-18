import { TokenService } from "./TokenService";

export class AuthGuard {
  static isAuthenticated() {
    const token = TokenService.getAccessToken();
    return token && !TokenService.isTokenExpired(token);
  }

  static isAuthorized(allowedRoles) {
    const userRole = TokenService.getUserRole();
    return allowedRoles.includes(userRole);
  }
}