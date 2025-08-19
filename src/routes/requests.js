const express = require("express");
const connectionRequestRouter = express.Router();
const {userAuth} = require("../middlewares/auth");
const ConnectionRequest = require("../model/connectionRequest");
const User = require("../model/user");


// request send API
connectionRequestRouter.post("/request/send/:status/:userId", userAuth, async (req,res) =>{
	try{
		const fromUserId = req.user._id;
		const toUserId = req.params.userId;
		const status = req.params.status;

		const allowedStatus = ["ignored","interested"];
		if(!allowedStatus.includes(status)){
			return res.status(401).json({
				message: "Invalid Status Type" + status
			});
		}

		const toUser = await User.findById(toUserId);
		if(!toUser){
			return res.status(400).json({
				message: "User Not found"
			});
		}

		const existingConnectionRequest = await ConnectionRequest.findOne({
			$or: [
				{fromUserId, toUserId},
				{fromUserId: toUserId, toUserId: fromUserId},
			],
		});

		if(existingConnectionRequest){
			return res.status(404).json({
				message: "Connection already exists"
			});
		}

		const connectionRequest = new ConnectionRequest({
			fromUserId,
			toUserId,
			status,
		});

		const data = await connectionRequest.save();
		res.json({
			message: req.user.firstName + " is " + status + " in " + toUser.firstName + " Profile..",
			data,
		})
	}catch(err){
		res.status(400).send("ERROR" + err.message);
	}
});


// request send API
connectionRequestRouter.post("/request/review/:status/:requestId", userAuth, async (req,res) => {
	try{
		const loggedInUser = req.user;
		const { status, requestId } = req.params;

		const allowedStatus = ["accepted","rejected"];

		if(!allowedStatus.includes(status)){
			return res.status(400).json({message: "Status not allowed"});
		}

		const connectionRequest = await ConnectionRequest.findOne({
			_id: requestId,
			toUserId: loggedInUser._id,
			status: "interested",
		});

		if(!connectionRequest){
			return res.status(400).json({
				message: "Connection request not found"
			});
		}

		connectionRequest.status = status;

		const data = connectionRequest.save();
		res.json({
			message: "Connection request " + status,
			data,
		})

	} catch (err) {
		res.status(400).message("ERROR" + err.message);
	}
});

module.exports = connectionRequestRouter;