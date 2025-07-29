const express = require("express");

const app = express();

app.get("/user",(req,res) => {
    res.send("User Data");
});

app.post("/user",(req,res) => {
    res.send("User Data saved succesfully");
});

app.put("/user",(req,res) => {
    res.send("User Data putted succesfully");
});

app.patch("/user",(req,res) => {
    res.send("User Data patched succesfully");
});

app.delete("/user",(req,res) => {
    res.send("User Data deleted succesfully");
});

app.use("/test", (req,res) => {
    res.send("Hello Test");
});

app.listen(7777,() => {
    console.log("server running on 7777");
});