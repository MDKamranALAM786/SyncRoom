import "dotenv/config";

export const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production"
};

export const generateAccessAndRefreshTokens = async (user) => {
    try {
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        console.log(`Access Token : ${accessToken}`);
        console.log(`Refresh Token : ${refreshToken}`);

        user.refreshToken = refreshToken;
        await user.save();

        return { accessToken, refreshToken };
    } catch (err) {
        console.log("Error in generateAccessAndRefreshTokens controller");
        console.log("Error : ", err.message);
        throw err;
    }
};

export const renewAccessToken = async (user) => {
    try {
        const accessToken = user.generateAccessToken();
        return accessToken;
    } catch (err) {
        console.log(`Error in renew access token : ${err.message}`);
        throw err;
    }
};

