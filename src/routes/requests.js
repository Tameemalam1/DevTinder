const express = require("express");
const connectionRequestRouter = express.Router();
const {userAuth} = require("../middlewares/auth");

connectionRequestRouter.get("/sendConnectionRequest", userAuth,async (req,res) =>{
	res.send("connection request sent");
})

module.exports = connectionRequestRouter;