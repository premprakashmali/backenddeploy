const { business_informations } = require('../models');

exports.details_Submission_controller = async (req, res) => {
    try {
        const userId = req.authData.id;

        const businessInfo = await business_informations.findOne({ where: { user_id: userId } });

        if (!businessInfo) {
            return res.status(404).json({ error: 'Business information not found for this user' });
        }

        const { consent } = req.body;

        const isConsent = Boolean(consent);

        const updatedInfo = await business_informations.update(
            { is_consent: isConsent },
            { where: { user_id: userId } }
        );

        

        if (updatedInfo[0] > 0) {
            return res.status(200).json({ message: 'Details updated successfully',is_consent: isConsent });
        } else {
            return res.status(404).json({ error: 'Business information not found for this user' });
        }
    } catch (error) {
        console.error('Error updating business information:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};
