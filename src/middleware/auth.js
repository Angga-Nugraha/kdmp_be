import jwt from "jsonwebtoken";
import { wrapAsync } from "../utils/wrapAsync.js";

export const auth = (roles = []) => {
    return wrapAsync(async (req, res, next) => {
        const auth = req.headers.authorization || "";
        const token = auth.startsWith("Bearer ") ? auth.slice(7) : null;
        if (!token) throw { status: 401, message: "Unauthorized" };
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        req.user = decoded;
        if (roles.length && !roles.includes(decoded.role)) {
            throw { status: 403, message: "Forbidden" };
        }
        next();
    });
};
