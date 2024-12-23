const validation = require('../utils/validation')
const { Op, where } = require('sequelize');
const { business_informations } = require('../models');
const { business_user } = require('../models');

exports.control_BusinessInformation = async (req, res) => {
    try {

        console.log("Received business_information body:", req.body);

        const { business_pan, business_gstn, business_logo_file, business_proof_file } = req.body;

        const userId = req.authData.id;
        const businessUser = await business_user.findOne({
            where: { id: userId },
            attributes: ['business_name']
        });

        if (!businessUser) {
            return res.status(404).json({ message: "Business user not found" });
        }

        const business_name = businessUser.business_name;

        if (!validation.isValidName(business_name)) {
            return res.status(400).json({ message: "Invalid business_name!!" });
        }
        if (!validation.isValidGstn(business_gstn)) {
            return res.status(400).json({ message: "Invalid GSTN number" });
        }
        if (!validation.isValidPan(business_pan)) {
            return res.status(400).json({ message: "Invalid PAN number" });
        }
        if (!validation.isValidBusiness_proof(business_proof_file)) {
            return res.status(400).json({ message: "Invalid business_proof file" });
        }
        if (!validation.isValidBusiness_logo(business_logo_file)) {
            return res.status(400).json({ message: "Invalid business_logo file" });
        }

        const existingBusiness = await business_informations.findOne({
            where: {
                [Op.or]: [
                    { business_name: business_name },
                    { business_pan: business_pan },
                    { business_gstn: business_gstn },
                    { user_id: userId },
                ]
            }
        });

        if (existingBusiness) {
            console.log("data already exit:", existingBusiness);
            return res.status(400).json({ message: 'Business information already exists' });
        }


        const newBusiness = await business_informations.create({
            user_id: userId,
            business_name,
            business_pan,
            business_gstn,
            business_logo_file,
            business_proof_file,
        });

        res.status(200).json({ message: 'Business information inserted successfully!', newBusiness });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to insert business information.', error });
    }
};


exports.get_Business_Information = async (req, res) => {
    try {
        const userId = req.authData.id;

        const businessInfo = await business_informations.findOne({
            where: { user_id: userId },
            attributes: ['business_pan', 'business_gstn', 'business_logo_file', 'business_proof_file']
        });

        if (!businessInfo) {
            return res.status(200).json({
                message: 'No business information found for this user. Returning default structure.',
                businessInfo: {
                    business_pan: "",
                    business_gstn: "",
                    business_logo_file: "",
                    business_proof_file: ""
                }
            });
        }

        return res.status(200).json({ message: 'Business information fetched successfully', businessInfo });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to fetch business information.', error: error.message });
    }
};



exports.control_edit_BusinessInformation = async (req, res) => {

    try {
        const { business_pan, business_gstn, business_logo_file, business_proof_file } = req.body;

        const userId = req.authData.id;


        const exitingbusiness = await business_informations.findOne({
            where: { user_id: userId }
        })

        if (!exitingbusiness) {
            return res.status(404).json({ message: "Business information not found" });
        }


        if (!validation.isValidGstn(business_gstn)) {
            return res.status(400).json({ message: "Invalid GSTN number" });
        }
        if (!validation.isValidPan(business_pan)) {
            return res.status(400).json({ message: "Invalid PAN number" });
        }
        if (!validation.isValidBusiness_proof(business_proof_file)) {
            return res.status(400).json({ message: "Invalid business_proof file" });
        }
        if (!validation.isValidBusiness_logo(business_logo_file)) {
            return res.status(400).json({ message: "Invalid business_logo file" });
        }

        await exitingbusiness.update({
            business_gstn,
            business_pan,
            business_proof_file,
            business_logo_file
        })

        return res.status(200).json({ message: "Business information updated successfully", business: exitingbusiness })

    }

    catch (err) {
        console.error(err)

        return res.status(500).json({ message: "Failed to update business information.", err })
    }


}

