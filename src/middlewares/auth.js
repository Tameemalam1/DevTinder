const jwt = require("jsonwebtoken");
const User = require("../model/user");
const userAuth = async (req,res,next) => {
    // read the token from request, validate and find
    try {
        const {token} = req.cookies;
        if (!token){
            return res.status(401).send("Please login!!")
        }

        const decodedObj = await jwt.verify(token, "DEV@Tinder780");
        const {_id} = decodedObj;
        const user = await User.findById(_id);

        if(!user){
            return res.status(404).send("User not found"); 
        }
        req.user = user;
        next();
    } catch(err){
		return res.status(400).send("ERROR: " + err.message);
	};
};

module.exports = { userAuth };