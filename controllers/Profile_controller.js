const { User } = require('../models');
const { business_user } = require('../models')

exports.control_Profile = async (req, res) => {
    try {
        const userIdFromToken = req.authData.id;
        const userIdFromParams = parseInt(req.params.id);

        console.log(`User ID from token: ${userIdFromToken}, User ID from params: ${userIdFromParams}`);
        console.log("Request Params:", req.params);

        if (isNaN(userIdFromParams)) {
            console.log("Invalid user ID in params");
            return res.status(400).json({ message: "Invalid user ID" });
        }

        if (userIdFromToken !== userIdFromParams) {
            console.log("Unauthorized access attempt");
            return res.status(403).json({ message: "Unauthorized access to profile" });
        }

        // Use Sequelize to find the user
        const userProfile = await User.findOne({
            attributes: ['email', 'mobile_number'],
            where: { id: userIdFromParams }
        });
        if (!userProfile) {
            return res.status(404).json({ message: "User not found" });
        }

        const userBusiness = await business_user.findOne({
            attributes: ['business_name'],
            where: { id: userIdFromParams }
        });

        if (!userBusiness) {
            return res.status(404).json({ message: "Business Name not found" });
        }

        return res.status(200).json({
            profile: {
                email: userProfile.email,
                mobile_number: userProfile.mobile_number,
                business_name: userBusiness.business_name
            }
        });
    } catch (err) {
        console.error("Error in profile handling:", err);
        return res.status(500).json({ message: "Internal server error" });
    }
};
