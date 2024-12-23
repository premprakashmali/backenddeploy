const { OnboardingProgress } = require("../models");

exports.updateProgress = async (req, res) => {

    const userId = req.authData.id;

    const { onboarding_status } = req.body;

    const validStatuses = ['select_platform', 'business_info_pending', 'bank_details_pending', 'submission_pending', 'completed'];

    //check onboarding_status valid or not 
    if (!onboarding_status || !validStatuses.includes(onboarding_status)) {
        return res.status(400).json({ message: 'Valid onboarding status is required', validStatuses });
    }

    try {

        if (req.body.user_id && req.body.user_id !== userId) {
            return res.status(403).json({ message: 'You can only update your own progress' });
        }

        // Find or create onboarding progress
        let progress = await OnboardingProgress.findOne({ where: { user_id: userId } });

        if (progress) {
            progress.onboarding_status = onboarding_status;
            await progress.save();
        }
        else {
            progress = await OnboardingProgress.create({
                user_id: userId,
                onboarding_status
            });
        }

        return res.status(200).json({ message: 'Onboarding progress updated successfully', progress });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error', error });
    }
};

exports.getProgress = async (req, res) => {

    const userId = req.authData.id;

    try {

        let progress = await OnboardingProgress.findOne({ where: { user_id: userId } });

        if (progress) {
            return res.status(200).json({ message: 'Onboarding progress retrieved successfully', progress });
        }
        else {
            return res.status(404).json({ message: 'No onboarding progress found for this user' });
        }

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error', error });
    }
};
