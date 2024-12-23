const axios = require('axios');
const { AUTH_URL, CLIENT_ID, REDIRECT_URI, TOKEN_URL, CLIENT_SECRET } = require('../config/amazonConfig');
const scope = "profile"; 

exports.control_AmazonLogin = (req, res) => {
    const loginUrl = `${AUTH_URL}?client_id=${CLIENT_ID}&scope=${scope}&response_type=code&redirect_uri=${REDIRECT_URI}`;
    res.json({ loginUrl });
};

exports.handleAmazoneCallback = async (req, res) => {
    const { code } = req.query;

    if (!code) {
        return res.status(400).json({ error: 'Authorization code is missing' });
    }

    try {
        const response = await axios.post(TOKEN_URL, {
            grant_type: 'authorization_code',
            code,
            redirect_uri: REDIRECT_URI,
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
        });

        const { access_token, refresh_token } = response.data;

        res.json({ message: 'Login successful', access_token, refresh_token });
    } catch (error) {
        console.error('Error in token exchange:', error.message);
        res.status(500).json({ error: 'Failed to exchange token' });
    }
};
