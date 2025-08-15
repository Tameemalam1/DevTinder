const jwt = require("jsonwebtoken");
const User = require("../model/user");
const userAuth = async (req,res,next) => {
    // read the token from request, validate and find
    try {
        const {token} = req.cookies;
        if (!token){
            throw new Error("Invalid Tokenn !!!");
        }

        const decodedObj = await jwt.verify(token, "DEV@Tinder780");
        const {_id} = decodedObj;
        const user = User.findById(_id);

        if(!user){
            throw new Error("User not found");
        }
        next();
    } catch(err){
		res.status(400).send("ERROR: "+ err.message);
	};
};

module.exports = { userAuth };