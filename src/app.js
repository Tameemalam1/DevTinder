const express = require("express");
const app = express();
const connectDB = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,

}));
app.use(express.json()); //middleware 
app.use(cookieParser());
const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const connectionRequestRouter = require("./routes/requests");
const userRouter = require("./routes/user");
app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", connectionRequestRouter);
app.use("/", userRouter);

connectDB().then(()=>{
    console.log("connection established successfully");
    app.listen(7777,() => {
        console.log("server running on 7777");
    });
}).catch((err) => {
    console.error("connection could'nt be established");
});

