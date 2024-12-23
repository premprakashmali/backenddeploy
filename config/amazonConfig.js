require('dotenv').config();

module.exports = {
    CLIENT_ID: process.env.CLIENT_ID,
    CLIENT_SECRET: process.env.CLIENT_SECRET,
    REDIRECT_URI: process.env.REDIRECT_URI,
    AUTH_URL: 'https://www.amazon.com/ap/oa',
    TOKEN_URL: 'https://api.amazon.com/auth/o2/token',
};
