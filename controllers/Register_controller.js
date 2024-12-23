const bcrypt = require('bcrypt');
const validation = require('../utils/validation');
const { User, business_user } = require('../models');
const { Op } = require('sequelize');

exports.control_Register = async (req, res) => {
    try {
        console.log("Register request body: ", req.body);

        const { business_name, email, mobile_number, password } = req.body;

        // Validation checks
        if (!validation.isValidEmail(email)) {
            return res.status(400).json({ message: 'Invalid email !!' });
        }
        if (!validation.isValidName(business_name)) {
            return res.status(400).json({ message: 'Invalid business name !!' });
        }
        if (!validation.isValidMobile(mobile_number)) {
            return res.status(400).json({ message: 'Invalid mobile number !!' });
        }
        if (!validation.isValidPassword(password)) {
            return res.status(400).json({ message: 'Invalid password !!' });
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const existingUser = await User.findOne({
            where: {
                [Op.or]: [
                    { email: email },
                    { mobile_number: mobile_number }
                ]
            }
        });

        if (existingUser) {
            return res.status(400).json({ message: "Email or mobile number already exists" });
        }

        const newUser = await User.create({
            email: email,
            mobile_number: mobile_number,
            password: hashedPassword
        });
  
        const newBusinessUser = await business_user.create({
            id: newUser.id,
            business_name: business_name,
        });

        return res.status(200).json({ message: 'User registered successfully', user: newUser, business_user: newBusinessUser });
    } catch (err) {
        console.error("Error during registration: ", err);
        return res.status(500).json({ message: 'Internal server error' });
    }
};
