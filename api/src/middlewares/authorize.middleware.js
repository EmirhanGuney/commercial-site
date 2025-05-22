import Response from "../utils/response.js";

// If no specific roles are provided, all authenticated users can access
export const authorizeMiddleware = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req.user) {
            return Response.unauthorized().send(res);
        }

        if (allowedRoles.length === 0) {
            return next();
        }

        if (!allowedRoles.includes(req.user.role)) {
            return Response.forbidden("Access forbidden: insufficient permissions").send(res);
        }

        next();
    };
};
