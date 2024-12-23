const { select_business_platform } = require('../models');
const { Op, where } = require('sequelize');

exports.control_select_platform = async (req, res) => {
    try {
        const { selected_platform } = req.body;
        const userId = req.authData.id;

        // Check if selected_platform is an array and not empty
        if (!Array.isArray(selected_platform) || selected_platform.length === 0) {
            return res.status(400).json({ message: 'No platforms selected.' });
        }

        // Validate each platform has both platform_name and platform_logo_url
        if (selected_platform.some(platform => !platform.platform_name || !platform.platform_logo_url)) {
            return res.status(400).json({ message: 'Each platform must have both name and logo URL.' });
        }


        // Fetch platforms already selected by the user
        const existingPlatforms = await select_business_platform.findAll({
            where: {
                user_id: userId,
                selected_platform: {
                    [Op.in]: selected_platform.map(platform => platform.platform_name),
                }
            }
        });

        // Extract the platform names of those already selected
        const existingPlatformNames = existingPlatforms.map(platform => platform.selected_platform);

        // Filter out the platforms that have already been selected
        const newPlatforms = selected_platform.filter(platform => !existingPlatformNames.includes(platform.platform_name));

        if (newPlatforms.length === 0) {
            return res.status(400).json({ message: 'This selected platforms already exist.' });
        }

        // Insert the new platforms (both name and logo URL)
        const newSelectedPlatforms = await Promise.all(
            newPlatforms.map(platform => select_business_platform.create({
                user_id: userId,
                selected_platform: platform.platform_name,
                platform_logo_url: platform.platform_logo_url,
            }))
        );

        // Return success response
        res.status(200).json({ message: 'Selected platforms inserted successfully!', newSelectedPlatforms });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to insert selected platforms.', error });
    }
};





exports.get_Selected_Platform_Controller = async (req, res) => {

    try {
        const userId = req.authData.id;

        const select_Platform = await select_business_platform.findAll({
            where: {
                user_id: userId
            }
        });


        if (!select_Platform || select_Platform.length === 0) {
            return res.status(404).json({ message: "No business platforms found" });
        }

        return res.status(200).json({ message: "selected Business platforms retrieved successfully ", select_Platform })
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to retrieve selected business platforms.', error })
    }
}


// exports.edit_Selected_Platform = async (req, res) => {

//     try {

//         const { selected_platform } = req.body;

//         const userId = req.authData.id;

//         const existingSelectPlatform = await select_business_platform.findOne({
//             where: { user_id: userId }
//         })

//         if (!existingSelectPlatform) {
//             return res.status(404).json({ message: "No Selected platform found for this user." })
//         }

//         await existingSelectPlatform.update({
//             selected_platform
//         });

//         return res.status(200).json({ message: "Business Bank details updated successfully!", existingBankDetails });

//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Failed to update business information.', error });
//     }
// }

