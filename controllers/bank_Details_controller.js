
const validation = require('../utils/validation')
const { business_bank_details } = require('../models')
const { Op, where } = require('sequelize');




exports.control_Bank_Details = async (req, res) => {
    try {

        const { account_holder_name, account_number, ifsc_code } = req.body;

        const userId = req.authData.id;

        if (!validation.isValidAccount_holder_name(account_holder_name)) {
            return res.status(500).json({ message: "Invalid Account Holder Name" })
        }
        if (!validation.isValidAccount_number(account_number)) {
            return res.status(500).json({ message: "Invalid Account Number" })
        }
        if (!validation.isValidifsc_code(ifsc_code)) {
            return res.status(500).json({ message: "Invalid IFSC code" })
        }

        const existingBank = await business_bank_details.findOne({
            where: {
                [Op.or]: [
                    { account_holder_name: account_holder_name },
                    { account_number: account_number },
                    { user_id: userId },
                ]
            }
        });

        if (existingBank) {
            console.log('Data already exit:', existingBank)
            return res.status(400).json({ message: 'Bank details Already exist' })
        }

        const newBusiness_Bank = await business_bank_details.create({
            user_id: userId,
            account_holder_name,
            account_number,
            ifsc_code,
        });

        res.status(200).json({ message: 'Bank Details inserted successfully!!', newBusiness_Bank })

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to insert Bank details.', error });
    }
}

exports.get_Bank_details = async (req, res) => {

    try {

        userId = req.authData.id;

        const bank_Details = await business_bank_details.findOne({
            where: { user_id: userId },
            attributes: ['account_holder_name', 'account_number', 'ifsc_code']
        })

        if (!bank_Details) {
            return res.status(200).json({
                message: "No business bank details found for this user",
                bank_Details: {
                    account_holder_name: "",
                    account_number: "",
                    ifsc_code: "",
                }
            })
        }

        return res.status(200).json({ message: "Bank details fetched succesfully", bank_Details })
    }

    catch (err) {
        console.error(err)
        res.status(500).json({ message: "failed to fetch bank details", err })
    }
}






exports.edit_Bank_Details = async (req, res, bank_Details) => {
    try {
        const { account_holder_name, account_number, ifsc_code } = req.body;
        const userId = req.authData.id;

        const existingBankDetails = await business_bank_details.findOne({
            where: { user_id: userId }
        });

        if (!existingBankDetails) {
            return res.status(404).json({ message: "No business Bank Details found for this user." });
        }

        if (!validation.isValidAccount_holder_name(account_holder_name)) {
            return res.status(500).json({ message: "Invalid Account Holder Name" });
        }
        if (!validation.isValidAccount_number(account_number)) {
            return res.status(500).json({ message: "Invalid Account Number" });
        }
        if (!validation.isValidifsc_code(ifsc_code)) {
            return res.status(500).json({ message: "Invalid IFSC code" });
        }

        await existingBankDetails.update({
            account_holder_name,
            account_number,
            ifsc_code
        });

        return res.status(200).json({ message: "Business Bank details updated successfully!", existingBankDetails });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to update business information.', error });
    }
};
