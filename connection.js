const mongoose = require("mongoose");
mongoose.set('strictQuery', false);

async function connectMongodb(url){
    return mongoose.connect(url);
}

module.exports = {
    connectMongodb,
}