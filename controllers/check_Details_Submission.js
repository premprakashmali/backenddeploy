const { where } = require("sequelize");
const { select_business_platform, business_informations, business_bank_details } = require('../models');

exports.check_details_Submission_Controller = async (req, res) => {

    const userId = req.authData.id

    try {
        const select_Platform = await select_business_platform.findOne({
            where: {
                user_id: userId
            }
        });

        const business_Information = await business_informations.findOne({
            where: {
                user_id: userId,
                is_consent: true
            }
        });

        const business_Bank_details = await business_bank_details.findOne({
            where: {
                user_id: userId
            }
        });

        if (!select_Platform || !business_Information || !business_Bank_details) {
            return res.status(400).json({ message: "Data not found", dataAvailable: false });
        }

        const isConsent = business_Information.is_consent;

        return res.status(200).json({
            message: "Data fetched successfully",
            select_Platform: select_Platform,
            business_Information: business_Information,
            business_Bank_details: business_Bank_details,
            isConsent: isConsent,
            dataAvailable: true
        });
    } catch (error) {
        console.error("Error fetching details:", error);
        return res.status(500).json({ message: "Server error", dataAvailable: false });
    }
};

