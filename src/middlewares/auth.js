const authAdmin = (req,res,next) => {
    const token = "xyzz";
    const isAdmin = token === "xyzz";
    if (!isAdmin){
        res.status(401).send("Not authorized");
    }else{
        next();
        // res.send("Authenticated");
    };
};

const Userauth = (req,res,next) => {
    const token = "xyzz";
    const isAdmin = token === "xyz";
    if (!isAdmin){
        res.status(401).send("Not authorized");
    }else{
        next();
        // res.send("Authenticated");
    };
};

module.exports = {
    authAdmin,
    Userauth,
};