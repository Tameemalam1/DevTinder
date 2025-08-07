const express = require("express");
const app = express();
const connectDB = require("./config/database");
const User = require("./model/user");

app.post("/signup",async (req,res)=>{
    const user = new User ({
        firstName: "Maliha",
        lastName: "alam",
        emailId: "maliha1@abc.com",
        password: "password"
    });

    try{
        await user.save();  
        res.send("User added successfully");
    }catch(err){
        res.status(400).send("error saving the user" + err.message);
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

