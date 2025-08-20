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

const validateEditProfileData = (req) => {
    const allowedEditFields = [
        "firstName",
        "lastName",
        "emailId",
        "photoUrl",
        "gender",
        "age",
        "about",
        "skills",
    ];
    const isEditAllowed = Object.keys(req.body).every((field) => allowedEditFields.includes(field));
    return isEditAllowed;
};

module.exports={
    validateSingUpData,
    validateEditProfileData,
}