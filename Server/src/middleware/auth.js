import "dotenv/config";
import jwt from "jsonwebtoken";
import httpStatus from "http-status";

import User from "../models/User.js";

export const verifyJWT = async (req, res, next) => {
    try {
        const accessToken = req.headers?.authorization;
        const refreshToken = req.cookies?.refreshToken;

        if (!accessToken && !refreshToken) {
            console.log("Missing Tokens in request body");
            return res.status(httpStatus.BAD_REQUEST)
                .json({ message: "Missing Tokens" });
        }

        if (accessToken) {
            let decodedToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
            if (decodedToken) {
                const user = await User.findById(decodedToken._id);
                req.user = user;
                return next();
            }

            console.log("Access Token Invalid or Expired");
        } else {
            console.log("Missing Access Token");
        }

        if (refreshToken) {
            decodedToken = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
            if (decodedToken) {
                const user = await User.findById(decodedToken._id);
                req.user = user;
                return next();
            }

            console.log("Refresh Token Invalid or Expired");
        } else {
            console.log("Missing Refresh Token");
        }

        return res.status(httpStatus.UNAUTHORIZED)
            .json({ message: "Access and Refresh Tokens Inavlid or Expired" });
    } catch (err) {
        console.log("Error in jwt middleware");
        console.log("Error : ", err.message);
        return res.status(httpStatus.INTERNAL_SERVER_ERROR)
            .json({ message: err.message });
    }
};

