const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 4,
    },
    lastName: {
        type: String
    },
    emailId: {
        type: String,
        required: true,
        unique: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Not a valid Email")
            }
        }
    },
    password: {
        type: String,
        required: true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Not a Strong pwd"+ value)
            }
        }
        
    },
    age: {
        type: Number,
        min: 18
    },
    about: {
        type: String,
        default: "This is about",
    },
    Gender: {
        type: String,
        validate(value) {
            if(!["male","female","others"]){
                throw new Error("Not a valid gender")
            }
        }
    },
    Skills: {
        type: [String],
        minLength: 10,
    },
},{
    timestamps: true,
});

module.exports = mongoose.model("User",userSchema);