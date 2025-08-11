const validator = require('validator');

const validateSingUpData = (req) => {
    // put validations
    const {firstName, lastName, emailId, password} = req.body;

    if(!firstName || !lastName){
        throw new Error("name is not valid");
    }else if(!validator.isEmail(emailId)){
        throw new Error("Not a valid email")
    }
};

module.exports={
    validateSingUpData,
}