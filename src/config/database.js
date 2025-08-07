const mongoose = require('mongoose');

const connectDB = async () => {
    await mongoose.connect("mongodb+srv://staquadri944:Atheralam12345@mynodedata.ppebzpp.mongodb.net/devTinder?retryWrites=true&w=majority&appName=MyNodeData");
    
};

module.exports = connectDB;



