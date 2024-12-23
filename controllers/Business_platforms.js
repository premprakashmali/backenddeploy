const { business_platforms } = require('../models');
const validation = require('../utils/validation')
const { Op } = require('sequelize');



exports.control_Business_platforms = async (req, res) => {

    try {

        const { platform_name, logo_url } = req.body;

        const existingplatform = await business_platforms.findOne({
            where: {
                [Op.or]: [

                    { platform_name: platform_name },
                    { logo_url: logo_url },
                ]
            }
        })
        if (existingplatform) {
            console.log('Data already exit:', existingplatform)
            return res.status(400).json({ message: 'Buisness platforms Already exist' })
        }

        const newBusiness_platforms = await business_platforms.create({
            platform_name,
            logo_url,
        })

        return res.status(200).json({ message: "Business platforms details inserted Succesfully!!", newBusiness_platforms })


    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to insert Business platforms details.', error });
    }

}

exports.get_Business_platforms = async (req, res) => {
    try {
        const businessPlatforms = await business_platforms.findAll();

        if (businessPlatforms.length === 0) {
            return res.status(404).json({ message: 'No business platforms found' });
        }

        return res.status(200).json({ message: 'Business platforms retrieved successfully', businessPlatforms });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to retrieve business platforms.', error });
    }
};
