import httpStatus from "http-status";
import bcrypt from "bcrypt";
import User from "../models/User.js";
import {
    cookieOptions,
    generateAccessAndRefreshTokens
} from "../utils/tokens.js";

export const signUp = async (req, res) => {
    try {
        console.log("Request received --> /signup");
        let { username, email, password } = req.body;

        if (!username || !email || !password) {
            console.log("Missing fields");
            return res.status(httpStatus.BAD_REQUEST)
                .json({ message: "Missing Fields" });
        }

        const userExists = await User.findOne({
            $or: [{ username }, { email }]
        });
        if (userExists) {
            console.log("User exists");
            return res.status(httpStatus.BAD_REQUEST)
                .json({ message: "User Already Exists" });
        }

        if (typeof (password) !== "string") {
            password = String(password);
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({
            username,
            email,
            password: hashedPassword
        });
        await user.save();

        const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user);
        console.log("User Registered");

        return res.status(httpStatus.OK)
            .cookie("refreshToken", refreshToken, cookieOptions)
            .json({ message: "User Registered!", accessToken });
    } catch (err) {
        console.log("Error inside signup controller");
        console.log("Error : ", err.message);
        return res.status(httpStatus.INTERNAL_SERVER_ERROR)
            .json({ message: err.message });
    }
};

export const signIn = async (req, res) => {
    try {
        console.log("Request received --> /signin");
        let { username, password } = req.body;

        if (!username || !password) {
            console.log("Missing fields");
            return res.status(httpStatus.BAD_REQUEST)
                .json({ message: "Missing Fields" });
        }

        const user = await User.findOne({ username });
        if (!user) {
            console.log("User not found");
            return res.status(httpStatus.NOT_FOUND)
                .json({ message: "User not found!" });
        }

        if (typeof (password) !== "string") {
            password = String(password);
        }

        const pass = await bcrypt.compare(password, user.password);
        if (!pass) {
            console.log("Invalid Password");
            return res.status(httpStatus.UNAUTHORIZED)
                .json({ message: "Invalid Password" });
        }

        const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user);
        console.log("User logged in");

        return res.status(httpStatus.OK)
            .cookie("refreshToken", refreshToken, cookieOptions)
            .json({ message: "User logged in!", accessToken });
    } catch (err) {
        console.log("Error inside signin controller");
        console.log("Error : ", err.message);
        return res.status(httpStatus.INTERNAL_SERVER_ERROR)
            .json({ message: err.message });
    }
};

export const logout = async (req, res) => {
    try {
        console.log("Request received --> /logout");

        const user = req.user;
        user.refreshToken = null;
        await user.save();

        res.clearCookie("refreshToken", cookieOptions);
        console.log("User Logged Out");

        return res.status(httpStatus.OK)
            .json({ message: "User Logged Out!" });
    } catch (err) {
        console.log("Error in logout controller");
        console.log("Error : ", err.message);
        return res.status(httpStatus.INTERNAL_SERVER_ERROR)
            .json({ message: err.message });
    }
};

