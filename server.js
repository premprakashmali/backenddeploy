const express = require('express');
const cors = require('cors');
const http = require('http')
// Controllers
const registerController = require('./controllers/Register_controller');
const loginController = require('./controllers/Login_controller');
const profileController = require('./controllers/Profile_controller');
const businessInfoController = require('./controllers/Business_Information_controller');
const businessBankDetailsController = require('./controllers/bank_Details_controller');
const { verifyToken } = require('./middleware/authorization_Middleware');
const { control_Business_platforms, get_Business_platforms } = require('./controllers/Business_platforms');
const { control_select_platform, get_Selected_Platform_Controller } = require('./controllers/Select_business_platform');
const { updateProgress, getProgress } = require('./controllers/onboardingprogress_controller');
const { onboarding_controller } = require('./controllers/Onboarding_get');
const { details_Submission_controller } = require('./controllers/Details_Submission');
const { check_details_Submission_Controller } = require('./controllers/check_Details_Submission');
const { onboarding_Status_controller } = require('./controllers/status_controller');
const { control_AmazonLogin, handleAmazoneCallback } = require('./controllers/amzoneAuth_Controller');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Auth Routes
app.post('/register', registerController.control_Register);
app.post('/login', loginController.control_Login);

// Profile Routes
app.get('/profile/:id', verifyToken, profileController.control_Profile);
app.post('/authorization', verifyToken, (req, res) => {
  res.json({ message: 'Authentication success', authData: req.authData });
});

// Business Platform Selection Routes
app.post('/select_business_platforms', verifyToken, control_select_platform);
app.get('/select_business_platforms/:user_id', verifyToken, get_Selected_Platform_Controller);

// Business Information Routes
app.post('/business_information', verifyToken, businessInfoController.control_BusinessInformation);
app.get('/business_information/:user_id', verifyToken, businessInfoController.get_Business_Information);
app.patch('/business_information/:user_id', verifyToken, businessInfoController.control_edit_BusinessInformation);

// Business Bank Details Routes
app.post('/business_bank_details', verifyToken, businessBankDetailsController.control_Bank_Details);
app.get('/business_bank_details/:user_id', verifyToken, businessBankDetailsController.get_Bank_details);
app.patch('/business_bank_details/:user_id', verifyToken, businessBankDetailsController.edit_Bank_Details);

// Business Platforms Routes
app.post('/business_platforms', verifyToken, control_Business_platforms);
app.get('/business_platforms', verifyToken, get_Business_platforms);

// Onboarding Progress Routes
app.post('/onboarding_progress', verifyToken, updateProgress);
app.get('/onboarding_progress/:user_id', verifyToken, getProgress);
app.get('/onboarding_get/:user_id', verifyToken, onboarding_controller);

// Submission Consent Routes
app.post('/submit_consent', verifyToken, details_Submission_controller);
app.get('/check_details/:user_id', verifyToken, check_details_Submission_Controller);

// Onboarding Status Routes
app.get('/onboarding_status/:user_id', verifyToken, onboarding_Status_controller);

// Amazon Auth Routes
app.get('/auth/amazon/login', control_AmazonLogin);
app.get('/auth/amazon/callback', handleAmazoneCallback);

app.get('/', (req, res) => {
  res.send(`
    <h1>Welcome to My Node.js Server!</h1>
    <p>This server is running on AWS EC2!</p>
  `);
});
// Server
app.get('/', (req, res) => {
  res.send(`
    <h1>Welcome to My Node.js Server!</h1>
    <p>This server is running on AWS EC2!</p>
  `);
});

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
