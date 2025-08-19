const express = require("express");
const authRouter = express.Router();
const { validateSingUpData } = require("../utils/validations");
const User = require("../model/user");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");



// signup api
authRouter.post("/signup", async (req,res)=>{
    try{
        validateSingUpData(req);
        const {firstName, lastName, emailId, password } = req.body;

        const passwordHash = await bcrypt.hash(password, 10);

        const user = new User ({
            firstName,
            lastName,
            emailId,
            password: passwordHash,
        });
        await user.save();  
        res.send("User added successfully");
    }catch(err){
        res.status(400).send("error saving the user" + err.message);
    };
    
});

// login api
authRouter.post("/login", async (req,res) => {
	try{
		const {emailId, password} = req.body;
		const user = await User.findOne({emailId: emailId});
		if(!user){
			throw new Error("Invalid Credentials");
		}
		const isPasswordValid = await user.validatePassword(password);
		if (isPasswordValid) {
			const token = await user.getJWT();
			res.cookie("token",token,{expires: new Date(Date.now() + 8 * 3600000)});
			res.send(user);
		}else{
			throw new Error("Invalid Credentials");
		}

	}catch(err){
		res.status(400).send("ERROR: "+ err.message);
	};
});

// logout api

authRouter.post("/logout", async (req,res) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
    });
    res.send("log out successful");
});


module.exports = authRouter;