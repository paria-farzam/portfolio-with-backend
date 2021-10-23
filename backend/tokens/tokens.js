const jwt = require('jsonwebtoken');

//create tokens
const createAccessToken = userId => {
    return jwt.sign({userId}, process.env.ACCESS_TOKEN_SECRET, {expiresIn : '30d'});
};

// const createRefreshToken = userId => {
//     return jwt.sign({userId}, process.env.REFRESH_TOKEN_SECRET, {expiresIn : '7d'})
// };

//send tokens
const sendAccessToken = (req, res, accessToken) => {
    localStorage.setItem('authentication', `Bearer ${accessToken}`);
    res.send({
        accessToken,
        username : req.body.username
    });
};

// const sendRefreshToken = (res, token) => {
//     res.cookie('refreshToken', token, {
//         httpOnly : true,
//         path : '/refresh_token'
//     });
// };

module.exports = {
    createAccessToken,
    // createRefreshToken,
    sendAccessToken,
    // sendRefreshToken
}