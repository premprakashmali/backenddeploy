const { User } = require('../models');
const {business_user} = require('../models')
const { Op } = require('sequelize');
const validation = require('../utils/validation');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwtSecretKey = "a4df7637-6d7b-49a6-b5c1-dc5041d175f5";

exports.control_Login = async (req, res) => {

    console.log("Login request body ", req.body);

    const { emailorMobile, password } = req.body;

    if (!validation.isValidEmail(emailorMobile) && !validation.isValidMobile(emailorMobile)) {
        return res.status(400).json({ message: 'Enter valid Email or Mobile number' });
    }

    if (!validation.isValidPassword(password)) {
        return res.status(400).json({ message: "Invalid Password !!" });
    }

    // Use Sequelize to find user by email or mobile_number
    const user = await User.findOne({
        where: {
            [Op.or]: [
                { email: emailorMobile },
                { mobile_number: emailorMobile }
            ]
        },
        attributes: ['id', 'password']
    });


    if (!user) {
        return res.status(400).json({ message: "Login failed: User not found" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        return res.status(400).json({ message: "Login failed: Incorrect password" });
    }


    const businessUser = await business_user.findOne({
        where: { id: user.id },
        attributes: ['business_name']
    });
    if (!businessUser) {
        return res.status(400).json({ message: "Business details not found" })
    }


    const token = jwt.sign({ id: user.id, business_name: businessUser.business_name }, jwtSecretKey, { expiresIn: '24h' });

    return res.json({ message: "Login successfully", token: token, id: user.id, business_name: businessUser.business_name  });

};
