import httpStatus from "http-status";

export const generateAccessAndRefreshTokens = async (user) => {
    try {
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save();

        return ({ accessToken, refreshToken });
    } catch (err) {
        console.log("Error in generateAccessAndRefreshTokens controller");
        console.log("Error : ", err.message);
        throw (err);
    }
};

