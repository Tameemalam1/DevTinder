const express = require("express");

const app = express();

app.use("/", (req,res) => {
    res.send("Hello from dashboard");
});

app.use("/test", (req,res) => {
    res.send("Hello Test");
});

app.use("/hello", (req,res) => {
    res.send("Hello Hello");
});

app.listen(7777,() => {
    console.log("server running on 7777");
});