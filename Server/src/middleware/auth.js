import "dotenv/config";
import jwt from "jsonwebtoken";
import httpStatus from "http-status";

import User from "../models/User.js";
import { cookieOptions, renewAccessToken } from "../utils/tokens.js";

export const verifyJWT = async (req, res, next) => {
    try {
        const accessToken = req.headers?.authorization?.split(" ")[1];
        const refreshToken = req.cookies?.refreshToken;

        console.log(`Access Token : ${accessToken}`);
        console.log(`Refresh Token : ${refreshToken}`);

        if (!accessToken && !refreshToken) {
            console.log("Missing Tokens in request body");
            return res.status(httpStatus.BAD_REQUEST)
                .json({ message: "Missing Tokens" });
        }

        let decodedToken;

        if (accessToken) {
            try {
                decodedToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
                if (decodedToken) {
                    const user = await User.findById(decodedToken._id);
                    req.user = user;
                    return next();
                }
            } catch (err) {
                console.log(`Error in verifying access token : ${err.message}`);
            }
        } else {
            console.log("Missing Access Token");
        }

        if (refreshToken) {
            try {
                decodedToken = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
                if (decodedToken) {
                    const user = await User.findById(decodedToken._id);

                    if (user && decodedToken === user.refreshToken) {
                        req.user = user;
                        req.accessToken = await renewAccessToken(user);
                        return next();
                    }

                    console.log("User not found associated with the cookie refresh token");
                    res.clearCookie("refreshToken", cookieOptions);
                }
            } catch (err) {
                console.log(`Error in verifying refresh token : ${err.message}`);
                res.clearCookie("refreshToken", cookieOptions);
            }
        } else {
            console.log("Missing Refresh Token");
        }

        return res.status(httpStatus.UNAUTHORIZED)
            .json({ message: "Access and Refresh Tokens Invalid or Expired" });
    } catch (err) {
        console.log("Error in jwt middleware");
        console.log("Error : ", err.message);
        return res.status(httpStatus.INTERNAL_SERVER_ERROR)
            .json({ message: err.message });
    }
};

