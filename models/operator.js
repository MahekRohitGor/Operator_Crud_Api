const mongoose = require("mongoose");

const operatorSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
        unique: true,
    },
    phone: {
        type: String,
        require: true,
        unique: true,
    }
});

const OPERATOR = mongoose.model("Operator", operatorSchema);
module.exports = OPERATOR;