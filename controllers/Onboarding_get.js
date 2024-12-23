const { business_informations } = require('../models')
const { business_bank_details } = require('../models')
const { select_business_platform } = require('../models')


exports.onboarding_controller = async (req, res) => {

    try {

        const userId = req.authData.id;


        const businessInfo = await business_informations.findOne({

            where: { user_id: userId },

        })
        const bankDeatils = await business_bank_details.findOne({
            where: { user_id: userId ,  
            },

        })

        const selectPlatform = await select_business_platform.findAll({
            where: { user_id: userId },
        })

        if (businessInfo && bankDeatils && selectPlatform.length > 0) {
            res.status(200).json({ business_informations: businessInfo, business_bank_details: bankDeatils, select_business_platform: selectPlatform });
        }
        else {
            res.status(404).json({ message: 'Data not found for the given ID in one or both tables' });
        }
    }
    catch (error) {
        res.status(500).json({ message:'Error fetching data', error: error.message });

    }

}