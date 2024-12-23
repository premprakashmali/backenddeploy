const { valid } = require("joi");

const isValidName = (name) => {
  let reg = /^[a-zA-Z]{3,30}$/;
  return reg.test(name);
}

const isValidEmail = (email) => {
  let pattern = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/;
  return pattern.test(email);
};

const isValidMobile = (mobile) => {
  let reg = /^[0-9]{10}$/;
  return reg.test(mobile)
}

const isValidPassword = (password) => {
  let pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
  return pattern.test(password)
}

const isValidGstn = (Gstn) => {
  let gstnpattern = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
  return gstnpattern.test(Gstn)
}

const isValidBusiness_proof = (file) => {
  let fileProofPattern = /\.(pdf)$/i; 
  return fileProofPattern.test(file);
};

const isValidBusiness_logo = (logo) => {
  let logoFilePattern = /\.(png|jpg|jpeg|gif)$/i;
  return logoFilePattern.test(logo);
};


const isValidPan = (Pan) => {
  let PanPattern =  /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
  return PanPattern.test(Pan);
};

const isValidAccount_holder_name = (Account_holder_name)=>{
  const accountHolderNamePattern = /^[A-Za-z\s'-,.]+$/
  return accountHolderNamePattern.test(Account_holder_name)
}

const isValidAccount_number = (Account_number)=>{
  const accountNumberPattern = /^\d{10}$/;
  return accountNumberPattern.test(Account_number)
}
const isValidifsc_code = (ifsc_code)=>{
  const ifscPattern = /^[A-Za-z]{4}0\d{6}$/
  return ifscPattern.test(ifsc_code)
}


module.exports = { isValidEmail, isValidName, isValidMobile, isValidPassword, isValidGstn, isValidBusiness_proof, isValidBusiness_logo,isValidPan,isValidAccount_holder_name,isValidAccount_number,isValidifsc_code }