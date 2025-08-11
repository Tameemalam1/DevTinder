const express = require("express");
const app = express();
const connectDB = require("./config/database");
const User = require("./model/user");
const bcrypt = require('bcrypt');
const { validateSingUpData } = require("./utils/validations");
app.use(express.json()); //middleware 

// post api
app.post("/signup",async (req,res)=>{
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

// get api
app.get("/feed", async(req,res) => {
	try{
		const users = await User.find({});
		res.send(users);
	}catch(err){
		res.status(400).send("Something went wrong");
	};
});

// get api by email id
app.get("/findByEmail", async (req,res) => {
	const userEmail = req.body.emailId;
	try {
		const user = await User.findOne({emailId: userEmail});
		console.log(user);
		if(!user){
			res.status(404).send("User Not Found")
		}else{
			res.send(user);
		}
	}catch(err){
		res.status(400).send("Something went wrong");
	};
	
});

// delete api
app.delete("/user", async (req,res) => {
	const userId =  req.body.userId
	try {
		const user = await User.findByIdAndDelete(userId);
		res.send("user deleted successfully");
	}catch(err){
		res.status(400).send("Something went wrong");
	};
	
});


// update API
app.patch("/user/:userId", async (req,res) => {
	const userId = req.params?.userId;
	const data = req.body;
	try{
		const ALLOWED_UPDATES = ["about","skills","gender","lastName",];

		const isUpdateAllowed = Object.keys(data).every((k) =>
			ALLOWED_UPDATES.includes(k)
		);
		if(!isUpdateAllowed){
			throw new Error("update not allowed")
		}
		const user = await User.findByIdAndUpdate({_id: userId}, data,{runValidators: true});
		res.send("user details updated successfully");
	}catch(err){
		res.status(400).send("Something went wrong");
	};
});


connectDB().then(()=>{
    console.log("connection established successfully");
    app.listen(7777,() => {
        console.log("server running on 7777");
    });
}).catch((err) => {
    console.error("connection could'nt be established");
});

