export const cookieOptions = {
    httpOnly: true,
    secure: true
};

export const generateAccessAndRefreshTokens = async (user) => {
    try {
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        console.log(`Access Token : ${accessToken}`);
        console.log(`Refresh Token : ${refreshToken}`);

        user.refreshToken = refreshToken;
        await user.save();

        return ({ accessToken, refreshToken });
    } catch (err) {
        console.log("Error in generateAccessAndRefreshTokens controller");
        console.log("Error : ", err.message);
        throw (err);
    }
};

