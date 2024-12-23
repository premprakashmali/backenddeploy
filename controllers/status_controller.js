const { where } = require("sequelize");
const { OnboardingProgress } = require("../models");


exports.onboarding_Status_controller = async (req, res) => {

    const userId = req.authData.id;

    try {

        let check_Status = await OnboardingProgress.findOne({ where: { user_id: userId } });

        if (check_Status) {
            return res.status(200).json({ message: 'Onboarding progress retrieved successfully', check_Status });
        }
        else {
            return res.status(404).json({ message: 'No onboarding progress found for this user' });
        }

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error', error });
    }

}