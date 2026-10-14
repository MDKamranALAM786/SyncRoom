import "dotenv/config";
import httpStatus from "http-status";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User";

export const signUp = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            console.log("Missing fields");
            return (res.status(httpStatus.BAD_REQUEST).json({ message: "Missing Fields" }));
        }

        const userExists = await User.findOne({
            $or: [{ username }, { email }]
        });
        if (userExists) {
            console.log("User exists");
            return (res.status(httpStatus.BAD_REQUEST).json({ message: "User Already Exists" }));
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({
            username,
            email,
            password: hashedPassword
        });
        await user.save();

        console.log("User Registered");
        return (res.status(httpStatus.OK).json({ message: "User Registered" }));
    } catch (err) {
        console.log("Error inside signup controller");
        console.log("Error : ", err.message);
        return (res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: err.message }));
    }
};

export const signIn = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            console.log("Missing fields");
            return (res.status(httpStatus.BAD_REQUEST).json({ message: "Missing Fields" }));
        }

        const user = await User.findOne({ username });
        if (!user) {
            console.log("User not found");
            return (res.status(httpStatus.NOT_FOUND).json({ message: "User not found!" }));
        }

        const pass = await bcrypt.compare(password, user.password);
        if (!pass) {
            console.log("Invalid Password");
            return (res.status(httpStatus.UNAUTHORIZED).json({ message: "Invalid Password" }));
        }

        console.log("User logged in");
        return (res.status(httpStatus.OK).json({ message: "User logged in" }));
    } catch (err) {
        console.log("Error inside signin controller");
        console.log("Error : ", err.message);
        return (res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: err.message }));
    }
};

